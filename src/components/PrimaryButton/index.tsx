
const PrimaryButton = ({ onClick, label }: { onClick: () => void, label: string }) => {
  return (
    <button className="text-xs hover:bg-yellow-400 hover:shadow-md shadow-yellow-500 bg-yellow-500 text-white rounded-md px-2 py-1" onClick={() => onClick()}>
      {label}
    </button>
  )
}

export default PrimaryButton;