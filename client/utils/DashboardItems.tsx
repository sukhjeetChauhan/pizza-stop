import { Collapse } from 'react-collapse'
import { DocumentData } from 'firebase/firestore'

interface DataProp {
  data: DocumentData[]
}

export default function DashboardItems({ data }: DataProp) {
  return (
    <div>
      {data.map((order, i) => (
        <div className="my-1" key={i}>
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
              {`${new Date(order.timestamp.seconds * 1000).toLocaleString(
                'en-GB',
                { hour12: true }
              )}`}
            </span>
            <span className="w-1/5 overflow-hidden text-center">
              {order.status}
            </span>
          </div>
          <Collapse isOpened={true}>
            <div></div>
          </Collapse>
        </div>
      ))}
    </div>
  )
}
