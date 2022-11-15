import axios from "axios";
import errorHandler from "../helpers/errorHandler";

// prettier-ignore
async function getOffers({ headers, limit = 4, location, page = 0, tagName, username }) {
  try {
    const url = {
      favorites: `api/offers?favorited=${username}&&limit=${limit}&&offset=${page}`,
      feed: `api/offers/feed?limit=${limit}&&offset=${page}`,
      global: `api/offers?limit=${limit}&&offset=${page}`,
      profile: `api/offers?author=${username}&&limit=${limit}&&offset=${page}`,
      tag: `api/offers?tag=${tagName}&&limit=${limit}&&offset=${page}`,
    };

    const { data } = await axios({ url: url[location], headers });

    return data;
  } catch (error) {
    errorHandler(error);
  }
}

export default getOffers;
