import Button from '../utils/Button'
import { MenuItem } from '../../types/menu'
import { Collapse } from 'react-collapse'
import '../styles/CustomizedOrder.css'

import { useGetData } from '../../data/hooks'

export default function CustomizedOrder({
  data,
  setModalStatus,
}: {
  data: MenuItem
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { data: upgrades, isLoading, isError } = useGetData('upgrades')

  if (isLoading) {
    return <p>Loading ......</p>
  }

  if (isError) {
    console.log('Error occured')
  }

  if (upgrades) {
    console.log(upgrades)
  }

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
        <div className="w-full p-6">
          <h2 className="text-xl font-semibold">First, select your size</h2>
          <Collapse isOpened={true}>
            <div className="flex gap-4">
              <div>
                <input type="radio" name="size_choice" />
                <label htmlFor="size_choice">{`Large ${data.price_large}`}</label>
              </div>
              <div>
                <input type="radio" name="size_choice" />
                <label htmlFor="size_choice">{`Small ${data.price_small}`}</label>
              </div>
            </div>
          </Collapse>
          <h2 className="text-xl font-semibold">Choose your extras</h2>
          <Collapse isOpened={true}>
            <div>
              {upgrades?.map((item) => (
                <div className="flex justify-between">
                  <div>
                    <input type="checkbox" name={item.name} />
                    <label htmlFor={item.name}>{item.name}</label>
                  </div>
                  <p>{`+ $${item.price}`}</p>
                </div>
              ))}
            </div>
          </Collapse>
        </div>
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
