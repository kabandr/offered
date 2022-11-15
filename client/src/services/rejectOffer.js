import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function rejectOffer({ slug, headers }) {
  try {
    const { data } = await axios({
      headers,
      method: "POST",
      url: `api/offers/${slug}/reject/`,
    });
    return data;
  } catch (error) {
    errorHandler(error);
  }
}

export default rejectOffer;
