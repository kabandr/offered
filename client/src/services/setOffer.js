import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function setOffer({ headers, slug, candidate, role, compensation, equity, benefits, terms, tagList }) {
  try {
    const { data } = await axios({
      data: { offer: { candidate, role, compensation, equity, benefits, terms, tagList } },
      headers,
      method: slug ? "PUT" : "POST",
      url: slug ? `api/offers/${slug}` : "api/offers",
    });

    return data.offer.slug;
  } catch (error) {
    errorHandler(error);
  }
}

export default setOffer;
