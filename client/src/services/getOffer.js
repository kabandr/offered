import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function getOffer({ headers, slug }) {
  try {
    const { data } = await axios({ headers, url: `api/offers/${slug}` });

    return data.offer;
  } catch (error) {
    errorHandler(error);
  }
}

export default getOffer;
