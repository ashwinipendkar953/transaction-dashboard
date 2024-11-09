import React from "react";

const TransactionTable = ({
  transactions,
  page,
  totalPages,
  handlePageChange,
}) => {
  return (
    <div>
      {transactions && transactions.length > 0 ? (
        <>
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Sold</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction) => (
                <tr key={transaction?._id}>
                  <td>{transaction?._id}</td>
                  <td>{transaction?.title}</td>
                  <td>{transaction?.description}</td>
                  <td>{transaction?.price}</td>
                  <td>{transaction?.category}</td>
                  <td>{transaction?.sold ? "True" : "False"}</td>
                  <td>
                    <img
                      src={transaction.image}
                      alt={transaction.title}
                      className="w-100 h-100"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="pagination-controls d-flex justify-content-center mt-4">
            <button
              className="btn btn-secondary mx-1"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="mx-2">
              Page {page} of {totalPages}
            </span>
            <button
              className="btn btn-secondary mx-1"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center mt-4">No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionTable;
