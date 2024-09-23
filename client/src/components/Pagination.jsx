import { useMemo, useState } from "react";

export const Pagination = ({ currentPage, numbers, setCurrentPage }) => {
  function changeCurrentPage(number) {
    setCurrentPage(number);
  }
  function prePage() {
    if (currentPage === 1) {
      setCurrentPage(numbers.length);
    } else {
      setCurrentPage(currentPage - 1);
    }
  }
  function nextPage() {
    if (currentPage === numbers.length) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div className="my-4 d-table mx-auto d-sm-block mx-sm-2 my-sm-0">
      <nav>
        <ul className="pagination custom-pagination">
          <li className="page-item">
            <a
              href="#"
              className="page-link"
              onClick={(e) => {
                e.preventDefault();
                prePage();
              }}
            >
              Prev
            </a>
          </li>
          {numbers.map((number, index) => (
            <li
              className={`page-item ${currentPage === number ? "active" : ""}`}
              key={index}
            >
              <a
                href="#"
                className="page-link"
                onClick={(e) => {
                  e.preventDefault();
                  changeCurrentPage(number);
                }}
              >
                {number}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              href="#"
              className="page-link"
              onClick={(e) => {
                e.preventDefault();
                nextPage();
              }}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
