import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function acceptOffer({ slug, headers}) {
  try {
    const { data } = await axios({
      headers,
      method: "PUT",
      url: `api/offers/${slug}/accept/`,
    });
    return data;
  } catch (error) {
    errorHandler(error);
  }
}

export default acceptOffer;
