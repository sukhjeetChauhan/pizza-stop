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
  const [openChoice, setOpenChoice] = useState(false)
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

  console.log(pizzasChoice, sidesChoice, drinksChoice, dessertChoice)

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

  async function handleClick() {
    openChoice ? setOpenChoice(false) : setOpenChoice(true)
  }
  console.log(sortedData)

  return (
    <div className="w-full p-6">
      {choices.map((item) => (
        <>
          <div className="p-3 rounded bg-gray-100 mt-2 flex justify-between">
            <h1>{`Select any ${
              (choiceObj && choiceObj[item]?.number) ?? 1
            } ${item}`}</h1>
            <button
              onClick={() => handleClick()}
              className="text-limeGreen bg-gray-100 p-1"
            >
              {openChoice ? '▲' : '▼'}
            </button>
          </div>
          <Collapse isOpened={openChoice}>
            <div>
              {Object.keys(sortedData).length > 0 &&
                Object.keys(sortedData[item]).map((type) => (
                  <div>
                    <h1>{type}</h1>
                    <div>
                      {sortedData[item][type].map((product) => (
                        <button>{product.name}</button>
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
