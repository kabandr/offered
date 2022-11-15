const slugify = (string) => {
  return string.trim().toLowerCase().replace(/\W|_/g, "-");
};

const appendTagList = (offerTags, offer) => {
  const tagList = offerTags.map((tag) => tag.name);

  if (!offer) return tagList;
  offer.dataValues.tagList = tagList;
};

const appendFavorites = async (loggedUser, offer) => {
  const favorited = await offer.hasUser(loggedUser ? loggedUser : null);
  offer.dataValues.favorited = loggedUser ? favorited : false;

  const favoritesCount = await offer.countUsers();
  offer.dataValues.favoritesCount = favoritesCount;
};

const appendOfferDecision = async (loggedUser, toAppend) => {
  //
  if (toAppend?.author) {
    const author = await toAppend.getAuthor();

    console.log('author', author);

    const following = await author.hasFollower(loggedUser ? loggedUser : null);
    toAppend.author.dataValues.following = loggedUser ? following : false;

    const followersCount = await author.countFollowers();
    toAppend.author.dataValues.followersCount = followersCount;
    //
  } else {
    const following = await toAppend.hasFollower(
      loggedUser ? loggedUser : null,
    );
    toAppend.dataValues.following = loggedUser ? following : false;

    const followersCount = await toAppend.countFollowers();
    toAppend.dataValues.followersCount = followersCount;
  }
};

module.exports = { slugify, appendTagList, appendFavorites, appendOfferDecision };
