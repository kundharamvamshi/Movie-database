import './index.css'

const Pagination = props => {
  const {currentPage, totalPages, onPreviousPage, onNextPage} = props

  return (
    <div className="pagination-container">
      <button
        type="button"
        className="page-btn"
        onClick={onPreviousPage}
        disabled={currentPage === 1}
      >
        ◀ Previous
      </button>

      <p className="page-number">
        Page {currentPage} of {totalPages}
      </p>

      <button
        type="button"
        className="page-btn"
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        Next ▶
      </button>
    </div>
  )
}

export default Pagination
