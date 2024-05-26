import Button from '../utils/Button'
import { MenuItem } from '../../types/menu'

export default function CustomizedOrder({
  data,
  setModalStatus,
}: {
  data: MenuItem
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>
}) {
  function handleSubmit() {
    setModalStatus(false)
  }
  return (
    <div className="flex w-[45rem]">
      <div className="w-1/4 border-r-2 border-slate-300] bg-center">
        <img
          className="w-screen"
          src="/images/Jalapeno pizza.webp"
          alt="modal pizza"
        />
      </div>
      <div className="w-3/4 flex flex-col items-center">
        <div className="w-full p-3 border-b-2 border-slate-300">
          <h1 className="text-3xl font-semibold mb-8">{data.name as string}</h1>
          <p className="mb-8">{data.description}</p>
        </div>
        <h2 className="text-xl font-semibold">
          First, select your size and crust
        </h2>
        <Button
          className="p-3 w-96 bg-green-500 text-white my-2"
          onClick={() => handleSubmit()}
        >
          Add to order
        </Button>
      </div>
    </div>
  )
}
