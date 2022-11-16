import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function declineOffer({ slug, headers }) {
  try {
    const { data } = await axios({
      headers,
      method: "PUT",
      url: `api/offers/${slug}/decline/`,
    });
    return data;
  } catch (error) {
    errorHandler(error);
  }
}

export default declineOffer;
