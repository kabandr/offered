const { UnauthorizedError, NotFoundError } = require("../helper/customErrors");
const { appendOfferDecision } = require("../helper/helpers");
const { User } = require("../models");

// Profile
const getProfile = async (req, res, next) => {
  try {
    const { loggedUser } = req;
    const { username } = req.params;

    const profile = await User.findOne({
      where: { username: username },
      attributes: { exclude: "email" },
    });
    if (!profile) throw new NotFoundError("User profile");

    await appendOfferDecision(loggedUser, profile);

    res.json({ profile });
  } catch (error) {
    next(error);
  }
};

// Accept/Reject Offer
const decisionToggler = async (req, res, next) => {
  try {
    const { loggedUser } = req;
    if (!loggedUser) throw new UnauthorizedError();

    const { username } = req.params;

    const offer = await User.findOne({
      where: { username: username },
      attributes: { exclude: "email" },
    });
    if (!profile) throw new NotFoundError("User profile");

    if (req.method === "POST") {
      await offer.accept(loggedUser);
    } else if (req.method === "DELETE") {
      await offer.reject(loggedUser);
    }

    await appendOfferDecision(loggedUser, offer);

    res.json({ offer });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, decisionToggler };
