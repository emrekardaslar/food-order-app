import React from "react";

function Pagination({
  postsPerPage,
  totalLength,
  paginate,
  nextPage,
  prevPage,
  currentPage
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalLength / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className="page-item">
          {currentPage !==1  && <a className="page-link" href="#" onClick={() => prevPage()}>
            Previous
          </a>}
        </li>
        {pageNumbers.map((num) => (
          <li className="page-item" key={num}>
            <a onClick={() => paginate(num)} href="#" className="page-link">
              {num}
            </a>
          </li>
        ))}
        <li className="page-item">
          {currentPage !== Math.ceil(totalLength / postsPerPage) && <a className="page-link" href="#" onClick={() => nextPage()}>
            Next
          </a>}
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
