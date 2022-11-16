const {
  AlreadyTakenError,
  FieldRequiredError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} = require("../helper/customErrors");
const {
  appendOfferDecision,
  appendFavorites,
  appendTagList,
  slugify,
} = require("../helper/helpers");
const { Offer, Tag, User } = require("../models");

const includeOptions = [
  { model: Tag, as: "tagList", attributes: ["name"] },
  { model: User, as: "author", attributes: { exclude: ["email"] } },
];

// All Offers - by Author/by Tag/Favorited by user
const allOffers = async (req, res, next) => {
  try {
    const { loggedUser } = req;

    const { author, tag, favorited, limit = 3, offset = 0 } = req.query;
    const searchOptions = {
      include: [
        {
          model: Tag,
          as: "tagList",
          attributes: ["name"],
          ...(tag && { where: { name: tag } }),
        },
        {
          model: User,
          as: "author",
          attributes: { exclude: ["email"] },
          ...(author && { where: { username: author } }),
        },
      ],
      limit: parseInt(limit),
      offset: offset * limit,
      order: [["createdAt", "DESC"]],
    };

    let offers = { rows: [], count: 0 };
    if (favorited) {
      const user = await User.findOne({ where: { username: favorited } });

      offers.rows = await user.getFavorites(searchOptions);
      offers.count = await user.countFavorites();
    } else {
      offers = await Offer.findAndCountAll(searchOptions);
    }

    for (let offer of offers.rows) {
      const offerTags = await offer.getTagList();

      appendTagList(offerTags, offer);
      await appendOfferDecision(loggedUser, offer);
      await appendFavorites(loggedUser, offer);

      delete offer.dataValues.Favorites;
    }

    res.json({ offers: offers.rows, offersCount: offers.count });
  } catch (error) {
    next(error);
  }
};

// Create Offer
const createOffer = async (req, res, next) => {
  try {
    const { loggedUser } = req;
    if (!loggedUser) throw new UnauthorizedError();

    const { candidate, role, compensation, equity, benefits, terms, tagList } =
      req.body.offer;
    if (!candidate) throw new FieldRequiredError("Candidate name is required");
    if (!role) throw new FieldRequiredError("Role is required");
    if (!equity) throw new FieldRequiredError("Equity is required");
    if (!benefits) throw new FieldRequiredError("Benefits is required");
    if (!terms) throw new FieldRequiredError("Terms is required");

    const slug = slugify(candidate);
    const slugInDB = await Offer.findOne({ where: { slug: slug } });
    if (slugInDB) throw new AlreadyTakenError("Candidate");

    const offer = await Offer.create({
      slug: slug,
      candidate: candidate,
      role: role,
      compensation: compensation,
      equity: equity,
      benefits: benefits,
      terms: terms,
    });

    for (const tag of tagList) {
      const tagInDB = await Tag.findByPk(tag.trim());

      if (tagInDB) {
        await offer.addTagList(tagInDB);
      } else if (tag.length > 2) {
        const newTag = await Tag.create({ name: tag.trim() });

        await offer.addTagList(newTag);
      }
    }

    delete loggedUser.dataValues.token;

    offer.dataValues.tagList = tagList;
    offer.setAuthor(loggedUser);
    offer.dataValues.author = loggedUser;
    await appendOfferDecision(loggedUser, loggedUser);
    await appendFavorites(loggedUser, offer);

    res.status(201).json({ offer });
  } catch (error) {
    next(error);
  }
};

// Feed
const offersFeed = async (req, res, next) => {
  try {
    const { loggedUser } = req;
    if (!loggedUser) throw new UnauthorizedError();

    const { limit = 4, offset = 0 } = req.query;
    const authors = await loggedUser.getFollowing();
    
    console.log('authors', authors);

    const offers = await Offer.findAndCountAll({
      include: includeOptions,
      limit: parseInt(limit),
      offset: offset * limit,
      order: [["createdAt", "DESC"]],
      where: { userId: authors.map((author) => author.id) },
    });

    for (const offer of offers.rows) {
      const offerTags = await offer.getTagList();

      appendTagList(offerTags, offer);
      await appendOfferDecision(loggedUser, offer);
      await appendFavorites(loggedUser, offer);
    }

    res.json({ offers: offers.rows, offersCount: offers.count });
  } catch (error) {
    next(error);
  }
};

// Single Offer by slug
const singleOffer = async (req, res, next) => {
  try {
    const { loggedUser } = req;

    const { slug } = req.params;
    const offer = await Offer.findOne({
      where: { slug: slug },
      include: includeOptions,
    });
    if (!offer) throw new NotFoundError("Offer");

    appendTagList(offer.tagList, offer);
    await appendOfferDecision(loggedUser, offer);
    await appendFavorites(loggedUser, offer);

    res.json({ offer });
  } catch (error) {
    next(error);
  }
};

// Update Offer
const updateOffer = async (req, res, next) => {
  try {
    const { loggedUser } = req;
    if (!loggedUser) throw new UnauthorizedError();

    const { slug } = req.params;
    const offer = await Offer.findOne({
      where: { slug: slug },
      include: includeOptions,
    });
    if (!offer) throw new NotFoundError("Offer");

    if (loggedUser.id !== offer.author.id) {
      throw new ForbiddenError("offer");
    }

    const { candidate, role, compensation, equity, benefits, terms } =
      req.body.offer;
    if (candidate) {
      offer.slug = slugify(candidate);
      offer.candidate = candidate;
    }
    if (role) offer.role = role;
    if (compensation) offer.compensation = compensation;
    if (equity) offer.equity = equity;
    if (benefits) offer.benefits = benefits;
    if (terms) offer.terms = terms;
    await offer.save();

    appendTagList(offer.tagList, offer);
    await appendOfferDecision(loggedUser, offer);
    await appendFavorites(loggedUser, offer);

    res.json({ offer });
  } catch (error) {
    next(error);
  }
};

// Accept Offer
const acceptOffer = async (req, res, next) => {
  try {
    const { loggedUser } = req;
    if (!loggedUser) throw new UnauthorizedError();

    const { slug } = req.params;
    const offer = await Offer.findOne({
      where: { slug: slug },
      include: includeOptions,
    });
    if (!offer) throw new NotFoundError("Offer");

    if (loggedUser.id !== offer.author.id) {
      throw new ForbiddenError("offer");
    }

    const {status} = req.body.offer;
    if (status) offer.status = status;  
    
    console('status', status);

    await offer.save();
    
    res.json({ offer });
  } catch (error) {
    next(error);
  }
};

// Decline Offer
const declineOffer = async (req, res, next) => {
  try {
    const { loggedUser } = req;
    if (!loggedUser) throw new UnauthorizedError();

    const { slug } = req.params;
    const offer = await Offer.findOne({
      where: { slug: slug },
      include: includeOptions,
    });
    if (!offer) throw new NotFoundError("Offer");

    if (loggedUser.id !== offer.author.id) {
      throw new ForbiddenError("offer");
    }

    const {status} = req.body.offer;
    if (status) offer.status = status;  
    
    await offer.save();
    
    res.json({ offer });
  } catch (error) {
    next(error);
  }
};

//* Delete Offer
const deleteOffer = async (req, res, next) => {
  try {
    const { loggedUser } = req;
    if (!loggedUser) throw new UnauthorizedError();

    const { slug } = req.params;
    const offer = await Offer.findOne({
      where: { slug: slug },
      include: includeOptions,
    });
    if (!offer) throw new NotFoundError("Offer");

    if (loggedUser.id !== offer.author.id) {
      throw new ForbiddenError("offer");
    }

    await offer.destroy();

    res.json({ message: { body: ["Offer deleted successfully"] } });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  allOffers,
  createOffer,
  singleOffer,
  updateOffer,
  acceptOffer,
  declineOffer,
  deleteOffer,
  offersFeed,
};
