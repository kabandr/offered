import React from "react";
import ReactPaginate from "react-paginate";
import { useAuth } from "../../context/AuthContext";
import getOffers from "../../services/getOffers";

function OffersPagination({
  offersCount,
  location,
  tagName,
  updateOffers,
  username,
}) {
  const totalPages = Math.ceil(offersCount / 3);
  const { headers } = useAuth();

  const handlePageChange = ({ selected: page }) => {
    getOffers({ headers, location, page, username, tagName })
      .then(updateOffers)
      .catch(console.error);
  };

  return (
    <ReactPaginate
      activeClassName="active"
      breakClassName="page-item"
      breakLabel="..."
      breakLinkClassName="page-link"
      containerClassName="pagination pagination-sm"
      nextClassName="page-item"
      nextLabel={<i className="ion-arrow-right-b"></i>}
      nextLinkClassName="page-link"
      onPageChange={handlePageChange}
      pageClassName="page-item"
      pageCount={totalPages}
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLabel={<i className="ion-arrow-left-b"></i>}
      previousLinkClassName="page-link"
      renderOnZeroPageCount={null}
    />
  );
}

export default OffersPagination;
