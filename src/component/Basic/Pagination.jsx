// // src/Components/PaginationComponent.js
// import React from "react";
// import styled from "styled-components";

// const PaginationContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 20px;
//   background-color: #f4f6f8;
//   border-radius: 10px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   margin-top: 20px;
// `;

// const PaginationButtons = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const PageButton = styled.button`
//   background-color: white;
//   border: 1px solid #ddd;
//   padding: 5px 10px;
//   margin: 0 5px;
//   border-radius: 5px;
//   cursor: pointer;
//   &:hover {
//     background-color: #f0f0f0;
//   }
//   ${(props) =>
//     props.active &&
//     `
//     background-color: #e0e0e0;
//     font-weight: bold;
//   `}
// `;

// const Ellipsis = styled.span`
//   padding: 5px 10px;
// `;

// const ItemsPerPage = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const Select = styled.select`
//   padding: 5px;
//   margin-left: 10px;
//   border-radius: 5px;
//   border: 1px solid #ddd;
//   cursor: pointer;
// `;

// const Pagination = ({
//   currentPage,
//   totalItems,
//   itemsPerPage,
//   onPageChange,
//   onItemsPerPageChange,
// }) => {
//   const handlePageChange = (page) => {
//     if (page < 1 || page > totalPages) return;
//     onPageChange(page);
//   };

//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   const getPaginationRange = () => {
//     const totalNumbers = 5;
//     const totalBlocks = totalNumbers + 2;

//     if (totalPages > totalBlocks) {
//       let startPage, endPage;
//       if (currentPage <= 3) {
//         startPage = 1;
//         endPage = 5;
//       } else if (currentPage + 2 >= totalPages) {
//         startPage = totalPages - 4;
//         endPage = totalPages;
//       } else {
//         startPage = currentPage - 2;
//         endPage = currentPage + 2;
//       }
//       return Array.from(
//         { length: endPage - startPage + 1 },
//         (_, i) => startPage + i
//       );
//     }

//     return Array.from({ length: totalPages }, (_, i) => i + 1);
//   };

//   const paginationRange = getPaginationRange();

//   return (
//     <>
//       {totalPages > 1 && (
//         <PaginationContainer>
//           <PaginationButtons>
//             <PageButton onClick={() => handlePageChange(1)}>&laquo;</PageButton>
//             <PageButton onClick={() => handlePageChange(currentPage - 1)}>
//               &lsaquo;
//             </PageButton>
//             {paginationRange[0] > 1 && <Ellipsis>...</Ellipsis>}
//             {paginationRange.map((page) => (
//               <PageButton
//                 key={page}
//                 active={page === currentPage}
//                 onClick={() => handlePageChange(page)}
//               >
//                 {page}
//               </PageButton>
//             ))}
//             {paginationRange[paginationRange.length - 1] < totalPages && (
//               <Ellipsis>...</Ellipsis>
//             )}
//             <PageButton onClick={() => handlePageChange(currentPage + 1)}>
//               &rsaquo;
//             </PageButton>
//             <PageButton onClick={() => handlePageChange(totalPages)}>
//               &raquo;
//             </PageButton>
//           </PaginationButtons>
//           <ItemsPerPage>
//             <Select
//               id="itemsPerPage"
//               value={itemsPerPage}
//               onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={50}>50</option>
//             </Select>
//           </ItemsPerPage>
//         </PaginationContainer>
//       )}
//     </>
//   );
// };

// export default Pagination;

import React from "react";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPaginationRange = () => {
    const totalNumbers = 5;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let startPage, endPage;
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
      return Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );
    }

    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const paginationRange = getPaginationRange();

  return (
    <>
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
            backgroundColor: "#f4f6f8",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            marginTop: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={() => handlePageChange(1)}
              style={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                padding: "5px 10px",
                margin: "0 5px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              &laquo;
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              style={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                padding: "5px 10px",
                margin: "0 5px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              &lsaquo;
            </button>
            {paginationRange[0] > 1 && (
              <span
                style={{
                  padding: "5px 10px",
                }}
              >
                ...
              </span>
            )}
            {paginationRange.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                style={{
                  backgroundColor: page === currentPage ? "#e0e0e0" : "white",
                  fontWeight: page === currentPage ? "bold" : "normal",
                  border: "1px solid #ddd",
                  padding: "5px 10px",
                  margin: "0 5px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  hover: {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                {page}
              </button>
            ))}
            {paginationRange[paginationRange.length - 1] < totalPages && (
              <span
                style={{
                  padding: "5px 10px",
                }}
              >
                ...
              </span>
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              style={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                padding: "5px 10px",
                margin: "0 5px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              &rsaquo;
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              style={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                padding: "5px 10px",
                margin: "0 5px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              &raquo;
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => {
                onPageChange(1)
                onItemsPerPageChange(Number(e.target.value))
              }}
              style={{
                padding: "5px",
                marginLeft: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                cursor: "pointer",
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
