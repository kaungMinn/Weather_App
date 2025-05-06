const Skeleton = () => {
  return (
    <div>
      <div className="h-[100px]" />
      <div className="md:grid md:grid-cols-3 md:gap-5 md:space-y-0 space-y-4">
        <div className="h-[300px] rounded-md animate-pulse bg-yellow-100"></div>
        <div className="h-[300px] rounded-md col-span-2 animate-pulse bg-yellow-100 "></div>
        <div className=" rounded-md animate-pulse bg-yellow-100"></div>
        <div className="h-[400px] rounded-md col-span-2 animate-pulse bg-yellow-100 "></div>
      </div>
    </div>
  )
}

export default Skeleton