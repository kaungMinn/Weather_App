import { PropsWithChildren } from "react"

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className=" p-2 lg:p-10 h-full bg-[url('/images/gold.jpg')] bg-cover bg-center h-screen overflow-auto w-full">
      <div className="h-full w-full bg-yellow-400 rounded-xl p-10 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100 overflow-auto">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout