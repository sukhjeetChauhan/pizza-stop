import { Collapse } from 'antd'
import { useGetData } from '../../data/hooks'
import Spinner from '../utils/Spinner'

export function Dashboard() {
  const { data, isLoading, isError } = useGetData('orders')

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    console.log('Error occured')
  }
  if (data) {
    console.log(data)
    return (
      <div className="bg-slate-100 w-full h-full flex flex-col items-center justify-center">
        {/* orders */}
        <div className="rounded shadow-lg w-[90%] h-[90%] bg-white">
          <div className="flex p-3 bg-gray-200 items-center font-bold">
            <span className="w-1/5 overflow-hidden text-center">Name</span>
            <span className="w-1/5 overflow-hidden text-center">Order Id</span>
            <span className="w-1/5 overflow-hidden text-center">Details</span>
            <span className="w-1/5 overflow-hidden text-center">Time</span>
            <span className="w-1/5 overflow-hidden text-center">Status</span>
          </div>
          {data.map((order, i) => (
            <div className="my-2" key={i}>
              <div className="flex justify-around p-3 bg-red-200 items-center font-bold rounded w-full">
                <span className="w-1/5 overflow-hidden text-center">
                  {order.name}
                </span>
                <span className="w-1/5 overflow-hidden text-center">
                  {order.id}
                </span>
                <span className="w-1/5 overflow-hidden text-center text-lime-700">
                  View
                </span>
                <span className="w-1/5 overflow-hidden text-center">
                  {`${new Date(order.timestamp.seconds * 1000)}`}
                </span>
                <span className="w-1/5 overflow-hidden text-center">
                  {order.status}
                </span>
              </div>
              <Collapse />
            </div>
          ))}
        </div>
      </div>
    )
  }
}
