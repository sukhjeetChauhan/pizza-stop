import { useContext } from 'react'

import { ControllerContext } from '../Providers/ControllerProvider'

interface ControllerFunctionProp {
  name?: string
}

function BtnOnOff({ name }: ControllerFunctionProp) {
  const { controllers, setControllerState } = useContext(ControllerContext)

  const controllerObject = name === 'delivery' ? 'deliveryState' : 'orderState'

  return (
    <div className="flex bg-slate-300 rounded-full justify-between p-1">
      <button
        className={`transition-all duration-700 ease-in-out rounded-full px-3 w-1/2 text-sm 
          ${!controllers[controllerObject] ? 'bg-green-500' : ''}
          `}
        onClick={() =>
          setControllerState({ ...controllers, [controllerObject]: true })
        }
      >
        <div className="flex flex-col items-center">
          <span className="font-semibold">ON</span>
        </div>
      </button>
      <button
        className={`transition-all duration-700 ease-in-out rounded-full px-3 w-1/2 text-sm 
          ${controllers[controllerObject] ? 'bg-red-500' : ''}
          `}
        onClick={() =>
          setControllerState({ ...controllers, [controllerObject]: false })
        }
      >
        <div className="flex flex-col items-center">
          <span className="font-semibold">OFF</span>
        </div>
      </button>
    </div>
  )
}

export function DeliveryController() {
  return (
    <div className="flex absolute top-8 left-60 gap-2">
      <p className="text-lg font-bold">Delivery</p>
      <BtnOnOff name="delivery" />
    </div>
  )
}

export function OnlineOrderingController() {
  return (
    <div className="flex absolute top-8 left-[450px] gap-2">
      <p className="text-lg font-bold">Online Ordering</p>
      <BtnOnOff name="orders" />
    </div>
  )
}
