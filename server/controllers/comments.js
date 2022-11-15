const {
  NotFoundError,
  UnauthorizedError,
  FieldRequiredError,
  ForbiddenError,
} = require("../helper/customErrors");
const { appendOfferDecision } = require("../helper/helpers");
const { Offer, Comment, User } = require("../models");

// All Comments for offer
const allComments = async (req, res, next) => {
  try {
    const { loggedUser } = req;
    const { slug } = req.params;

    const offer = await Offer.findOne({ where: { slug: slug } });
    if (!offer) throw new NotFoundError("offer");

    const comments = await offer.getComments({
      include: [
        { model: User, as: "author", attributes: { exclude: ["email"] } },
      ],
    });

    for (const comment of comments) {
      await appendOfferDecision(loggedUser, comment);
    }

    res.json({ comments });
  } catch (error) {
    next(error);
  }
};

// Create Comment for offer
const createComment = async (req, res, next) => {
  try {
    const { loggedUser } = req;
    if (!loggedUser) throw new UnauthorizedError();

    const { body } = req.body.comment;
    if (!body) throw new FieldRequiredError("Comment body");

    const { slug } = req.params;
    const offer = await Offer.findOne({ where: { slug: slug } });
    if (!offer) throw new NotFoundError("Offer");

    const comment = await Comment.create({
      body: body,
      offerId: offer.id,
      userId: loggedUser.id,
    });

    delete loggedUser.dataValues.token;
    comment.dataValues.author = loggedUser;
    await appendOfferDecision(loggedUser, loggedUser);

    res.status(201).json({ comment });
  } catch (error) {
    next(error);
  }
};

// Delete Comment for offer
const deleteComment = async (req, res, next) => {
  try {
    const { loggedUser } = req;
    if (!loggedUser) throw new UnauthorizedError();

    const { slug, commentId } = req.params;

    const comment = await Comment.findByPk(commentId);
    if (!comment) throw new NotFoundError("Comment");

    if (loggedUser.id !== comment.userId) {
      throw new ForbiddenError("comment");
    }

    await comment.destroy();

    res.json({ message: { body: ["Comment deleted successfully"] } });
  } catch (error) {
    next(error);
  }
};

module.exports = { allComments, createComment, deleteComment };
