import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'
import Controller from '../../types/ControllersType'
import useUpdateData, { useGetData } from '../../data/hooks'

interface Props {
  children: ReactNode
}

// Define the type for the context
interface ControllerContextType {
  controllers: Controller
  setControllerState: (state: Controller) => void
}

export const ControllerContext = createContext<ControllerContextType>({
  controllers: {} as Controller,
  setControllerState: () => {},
})

// Provider component
export const ControllerProvider: React.FC<Props> = ({ children }) => {
  const initialValue: Controller = {
    id: 123,
    deliveryState: true,
    orderState: true,
  }

  // Define the state for controllers
  const [controllers, setControllers] = useState<Controller>(initialValue)
  const { data } = useGetData('Controllers')
  const updateController = useUpdateData('Controllers', 'Controllers', '1')

  // Update controllers state when data changes
  useEffect(() => {
    if (data) {
      setControllers(data[0])
    }
  }, [data])

  // Function to update controller state
  const setControllerState = useCallback(
    (data: Controller) => {
      setControllers(data)
      updateController.mutate(data)
    },
    [updateController]
  )

  // Provide the state and functions to the context
  return (
    <ControllerContext.Provider value={{ controllers, setControllerState }}>
      {children}
    </ControllerContext.Provider>
  )
}
