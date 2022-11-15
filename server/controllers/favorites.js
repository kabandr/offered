const { UnauthorizedError, NotFoundError } = require("../helper/customErrors");
const {
  appendOfferDecision,
  appendFavorites,
  appendTagList,
} = require("../helper/helpers");
const { Offer, Tag, User } = require("../models");

//  Favorite/Unfavorite offer
const favoriteToggler = async (req, res, next) => {
  try {
    const { loggedUser } = req;
    if (!loggedUser) throw new UnauthorizedError();

    const { slug } = req.params;

    const offer = await Offer.findOne({
      where: { slug: slug },
      include: [
        {
          model: Tag,
          as: "tagList",
          attributes: ["name"],
        },
        {
          model: User,
          as: "author",
          attributes: ["username", "bio", "image"],
        },
      ],
    });
    if (!offer) throw new NotFoundError("Offer");

    if (req.method === "POST") await offer.addUser(loggedUser);
    if (req.method === "DELETE") await offer.removeUser(loggedUser);

    appendTagList(offer.tagList, offer);
    await appendOfferDecision(loggedUser, offer);
    await appendFavorites(loggedUser, offer);

    res.json({ offer });
  } catch (error) {
    next(error);
  }
};

module.exports = { favoriteToggler };
