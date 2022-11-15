import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function deleteOffer({ slug, headers }) {
  try {
    const { data } = await axios({
      headers,
      method: "DELETE",
      url: `api/offers/${slug}/`,
    });

    return data;
  } catch (error) {
    errorHandler(error);
  }
}

export default deleteOffer;
