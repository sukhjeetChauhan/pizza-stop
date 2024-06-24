import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ChoiceItem } from '../components/CartProvider'

import { MenuItem } from '../../types/menu'
import { Combos, Combo, Choices } from '../../types/deals'
import { Collapse } from 'react-collapse'
import { getDataByType } from '../../src/db'
import { sortBasedOnType } from '../../data/data_manipulation'

interface Props {
  data: MenuItem
  setDealChoices: Dispatch<SetStateAction<ChoiceItem | undefined>>
}
export default function ChoiceSelection({ setDealChoices, data }: Props) {
  const [pizzasChoice, setPizzasChoice] = useState<string[]>([])
  const [sidesChoice, setSidesChoice] = useState<string[]>([])
  const [drinksChoice, setDrinksChoice] = useState<string[]>([])
  const [dessertChoice, setDessertChoice] = useState<string[]>([])
  const [deal, setDeal] = useState<Combo>()
  const [openPizza, setOpenPizza] = useState(false)
  const [openSide, setOpenSide] = useState(false)
  const [openDrinks, setOpenDrinks] = useState(false)
  const [openDessert, setOpenDessert] = useState(false)
  const [sortedData, setSortedData] = useState({})

  const choicesObj: Combos = {
    'The Netflix Night': {
      choices: {
        pizzas: { type: 'any', number: 1 },
      },
      fixed: {
        sides: ['garlic bread'],
        desserts: ['chocolate mousse'],
        drinks: ['1.5 ltr drink'],
      },
    },
    'The Lunch combo': {
      choices: {
        pizzas: { type: 'Value Range', number: 1 },
      },
      fixed: {
        sides: ['chips'],
        drinks: ['can drink'],
      },
    },
    'Double combo': {
      choices: {
        pizzas: { type: 'any', number: 2 },
      },
      fixed: {
        sides: ['garlic bread'],
        drinks: ['1.5 ltr drink'],
      },
    },
    'The value deal': {
      choices: {
        pizzas: { type: 'Value Range', number: 2 },
      },
      fixed: {
        sides: ['garlic bread'],
        drinks: ['1.5 ltr drink'],
      },
    },
    'Triple combo': {
      choices: {
        pizzas: { type: 'any', number: 3 },
      },
      fixed: {
        sides: ['garlic bread'],
        drinks: ['1.5 ltr drink'],
      },
    },
    'Stuffed crust combo': {
      choices: {
        pizzas: { type: 'any', number: 2 },
        sides: { type: 'regular', number: 2 },
      },
      fixed: {},
    },
  }

  useEffect(() => {
    if (choicesObj) {
      const dealType = choicesObj[data.name]

      setPizzasChoice(dealType.fixed?.pizzas ?? [])
      setSidesChoice(dealType.fixed?.sides ?? [])
      setDrinksChoice(dealType.fixed?.drinks ?? [])
      setDessertChoice(dealType.fixed?.desserts ?? [])
      setDeal(dealType)
    }
  }, [])

  useEffect(() => {
    async function setData() {
      const res = await getChoiceData()
      setSortedData(res)
    }
    setData()
  }, [deal])

  // console.log(pizzasChoice, sidesChoice, drinksChoice, dessertChoice)

  const choices = deal?.choices
    ? (Object.keys(deal.choices) as (keyof Choices)[])
    : []
  const choiceObj = deal?.choices

  async function getChoiceData() {
    let obj: any = {}

    for (const item of choices) {
      const type = choiceObj && choiceObj[item]?.type

      if (type) {
        const res = await getDataByType(item, type as string)
        const data = sortBasedOnType(res as any)
        obj[item as string] = data.menu
      }
    }

    return obj
  }

  function setOpenWindow(item: string) {
    const res =
      item === 'pizzas'
        ? { state: openPizza, setState: setOpenPizza }
        : item === 'sides'
        ? { state: openSide, setState: setOpenSide }
        : item === 'drinks'
        ? { state: openDrinks, setState: setOpenDrinks }
        : { state: openDessert, setState: setOpenDessert }
    return res
  }

  function setChoice(item: string) {
    const res =
      item === 'pizzas'
        ? { state: pizzasChoice, setState: setPizzasChoice }
        : item === 'sides'
        ? { state: sidesChoice, setState: setSidesChoice }
        : item === 'drinks'
        ? { state: drinksChoice, setState: setDrinksChoice }
        : { state: dessertChoice, setState: setDessertChoice }
    return res
  }

  function handleClick(item: string) {
    const window = setOpenWindow(item)
    window.state ? window.setState(false) : window.setState(true)
  }

  function handleChoice(type: string, name: string) {
    const choice = setChoice(type)
    const state = choice.state
    const setState = choice.setState

    if (state.includes(name)) {
      const newState = state.filter((item) => item !== name)
      setState(newState)
    } else {
      setState([...state, name])
    }
  }
  console.log(pizzasChoice, sidesChoice)

  return (
    <div className="w-full p-6">
      {choices.map((item) => (
        <>
          <div className="p-3 rounded bg-gray-100 mt-2 flex justify-between">
            <h1>{`Select any ${
              (choiceObj && choiceObj[item]?.number) ?? 1
            } ${item}`}</h1>
            <button
              onClick={() => handleClick(item)}
              className="text-limeGreen bg-gray-100 p-1"
            >
              {setOpenWindow(item).state ? '▲' : '▼'}
            </button>
          </div>
          <Collapse isOpened={setOpenWindow(item).state}>
            <div>
              {Object.keys(sortedData).length > 0 &&
                Object.keys(sortedData[item]).map((type) => (
                  <div>
                    <h1>{type}</h1>
                    <div>
                      {sortedData[item][type].map((product) => (
                        <button
                          onClick={() => handleChoice(item, product.name)}
                        >
                          {product.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </Collapse>
        </>
      ))}
    </div>
  )
}
