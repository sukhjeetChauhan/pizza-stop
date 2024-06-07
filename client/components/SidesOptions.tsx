import { Dispatch, SetStateAction, useState } from 'react'
import { Collapse } from 'react-collapse'

interface Props {
  toppingsChoice: string[]
  swirlsChoice: string[]
  setToppingsChoice: Dispatch<SetStateAction<string[]>>
  setSwirlsChoice: Dispatch<SetStateAction<string[]>>
}

export default function SidesOPtions({
  toppingsChoice,
  swirlsChoice,
  setToppingsChoice,
  setSwirlsChoice,
}: Props) {
  const [openToppings, setOpenToppings] = useState(false)
  const [openSwirls, setOpenSwirls] = useState(false)

  const toppingsArr = [
    'Ham',
    'Bacon',
    'Chicken',
    'Pepperoni',
    'sausage',
    'Beef',
  ]
  const swirlsArr = ['Aioli', 'BBQ', 'Mayo', 'Peri Peri']

  function handleOption(item: any, type: string): void {
    if (type === 'toppings') {
      if (toppingsChoice.includes(item as string)) {
        const choice = toppingsChoice.filter((i) => i !== item)
        setToppingsChoice(choice)
      } else {
        const choice = [...toppingsChoice, item]
        if (toppingsChoice.length < 2) {
          setToppingsChoice(choice)
        }
      }
    }
    if (type === 'swirls') {
      if (swirlsChoice.includes(item)) {
        const choice = swirlsChoice.filter((i) => i !== item)
        setSwirlsChoice(choice)
      } else {
        const choice = [...swirlsChoice, item]
        if (swirlsChoice.length < 2) {
          setSwirlsChoice(choice)
        }
      }
    }
  }

  return (
    <div>
      <div className="p-3 rounded bg-gray-100 mt-2 flex justify-between">
        <h2 className="text-xl font-semibold mb-2">Toppings</h2>
        <button
          onClick={() =>
            openToppings ? setOpenToppings(false) : setOpenToppings(true)
          }
          className="text-limeGreen bg-gray-100 p-1"
        >
          {openToppings ? '▲' : '▼'}
        </button>
      </div>
      <Collapse isOpened={openToppings}>
        <div className="flex flex-wrap gap-2">
          {toppingsArr.map((item: any, i: number) => (
            <button
              key={i}
              onClick={() => handleOption(item, 'toppings')}
              className={`p-2 border-2 font-bold ${
                toppingsChoice.includes(item)
                  ? `text-white rounded bg-limeGreen  border-limeGreen`
                  : `text-limeGreen rounded bg-white  border-limeGreen`
              } `}
            >
              {item}
            </button>
          ))}
        </div>
      </Collapse>
      <div className="p-3 rounded bg-gray-100 mt-2 flex justify-between">
        <h2 className="text-xl font-semibold mb-2">Choose your Swirls</h2>
        <button
          onClick={() =>
            openSwirls ? setOpenSwirls(false) : setOpenSwirls(true)
          }
          className="text-limeGreen bg-gray-100 p-1"
        >
          {openSwirls ? '▲' : '▼'}
        </button>
      </div>
      <Collapse isOpened={openSwirls}>
        <div className="flex flex-wrap gap-2">
          {swirlsArr.map((item: any, i: number) => (
            <button
              key={i}
              onClick={() => handleOption(item, 'swirls')}
              className={`p-2 border-2 font-bold ${
                swirlsChoice.includes(item)
                  ? `text-white rounded bg-limeGreen  border-limeGreen`
                  : `text-limeGreen rounded bg-white  border-limeGreen`
              } `}
            >
              {item}
            </button>
          ))}
        </div>
      </Collapse>
    </div>
  )
}
