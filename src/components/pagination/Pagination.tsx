import PageButton from './PageButton'

function Pagination(props: Props) {
  const handlePageChange = (page: number) => {
    if (page === props.currentPage) return
    props.onPageChange(page)
  }

  const pagesNumbers = Array.from(
    { length: props.totalPages },
    (_, index) => index + 1,
  )

  return (
    <div className="flex mt-4">
      {pagesNumbers.map((pageNumber) => (
        <PageButton
          key={pageNumber}
          page={pageNumber}
          currentPage={props.currentPage}
          onClick={handlePageChange}
        />
      ))}
    </div>
  )
}
interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default Pagination
