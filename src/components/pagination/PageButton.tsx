interface Props {
  page: number
  currentPage: number
  onClick: (page: number) => void
}

function PageButton(props: Props) {
  const isActive = props.page === props.currentPage
  const buttonClassName = `mx-1 px-3 py-2 rounded-lg ${
    isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
  }`

  return (
    <button
      className={buttonClassName}
      onClick={() => props.onClick(props.page)}
    >
      {props.page}
    </button>
  )
}

export default PageButton
