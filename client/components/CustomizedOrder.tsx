import Button from '../utils/Button'
import { MenuItem } from '../../types/menu'
import { Collapse } from 'react-collapse'
import '../styles/CustomizedOrder.css'

import { useGetData } from '../../data/hooks'
import { useContext, useState } from 'react'
import {
  CartContext,
  CartItem,
  CartItemWithId,
  ChoiceItem,
} from '../Providers/CartProvider'
import SidesOPtions from './SidesOptions'
import ChoiceSelection from '../utils/ChoiceSelection'

interface Upgrade {
  name: string
  price: number
  quantity: number
}

export default function CustomizedOrder({
  data,
  setModalStatus,
}: {
  data: MenuItem
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { data: upgrades, isLoading, isError } = useGetData('upgrades')

  const initialState: CartItemWithId = {
    id: data.id,
    name: data.name,
    price:
      data.type === 'Loaded' || data.type === 'deals'
        ? Number(data.price)
        : (data.price_large as number),
    quantity: 1,
    upgrades: [],
    toppings: [],
    swirls: [],
    choice: {
      pizzas: [],
      sides: [],
      drinks: [],
      desserts: [],
    },
  }
  const [cartItem, setCartItem] = useState(initialState)
  const [openExtra, setOpenExtra] = useState(false)
  const [openToppings, setOpenToppings] = useState(false)
  const [openSwirls, setOpenSwirls] = useState(false)
  const [upgradeCart, setUpgradeCart] = useState<Upgrade[]>([])
  const [toppingsChoice, setToppingsChoice] = useState<string[]>([])
  const [swirlsChoice, setSwirlsChoice] = useState<string[]>([])
  const [dealChoices, setDealChoices] = useState<ChoiceItem>({
    pizzas: [''],
    sides: [''],
    drinks: [''],
    desserts: [''],
  })
  const cart = useContext(CartContext)

  const filteredUpgrades = upgrades?.filter(
    (item: any) => item.name !== 'Toppings' && item.name !== 'Extra Swirl'
  )
  const toppingsArr = upgrades?.filter(
    (item: any) => item.name === 'Toppings'
  )[0].Toppings

  const swirlsArr = upgrades?.filter(
    (item: any) => item.name === 'Extra Swirl'
  )[0].swirls

  if (isLoading) {
    return <p>Loading ......</p>
  }

  if (isError) {
    console.log('Error occured')
  }

  function findItem(item: string, data: any) {
    const res = data.find((i: { name: string }) => i.name === item)
    return { data: res, status: res ? true : false }
  }

  function handleSubmit() {
    const upgradeArr = upgradeCart.map((item) => item.name)
    const upgradeCost = upgradeCart.reduce((a, c) => a + Number(c.price), 0)
    const toppingCost =
      toppingsChoice.length > 0 ? toppingsChoice.length * 1.99 : 0
    const swirlsCost = swirlsChoice.length > 0 ? swirlsChoice.length * 0.5 : 0

    const otherCost = toppingCost + swirlsCost
    const finalCartItem = {
      ...cartItem,
      upgrades: upgradeArr,
      toppings: toppingsChoice,
      swirls: swirlsChoice,
      choice: dealChoices,
      price:
        data.type === 'Loaded'
          ? Number(cartItem.price) + otherCost
          : (Number(cartItem.price) + upgradeCost + otherCost).toFixed(2),
    }

    const arr = Object.values(dealChoices)
    const allEmpty = arr.every(
      (item) => JSON.stringify(item) == JSON.stringify([''])
    )

    if (data.type === 'deals' && allEmpty) {
      alert('Please make sure to choose an item')
    } else {
      cart.addToCart(finalCartItem)
      setModalStatus(false)
    }
  }
  function handleCart(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.type === 'radio') {
      setCartItem({ ...cartItem, price: Number(e.target.value) })
    }
    if (e.target.type === 'checkbox') {
      const checkedItem = findItem(e.target.value, upgrades).data as CartItem
      const upgradeItem = {
        name: checkedItem.name,
        price: checkedItem.price,
        quantity: 1,
      }

      if (e.target.checked) {
        if (!findItem(upgradeItem.name, upgradeCart).status) {
          setUpgradeCart([...upgradeCart, upgradeItem])
        }
      } else {
        const newUpgradeCart = upgradeCart.filter(
          (i: Upgrade) => i.name !== upgradeItem.name
        )
        setUpgradeCart(newUpgradeCart)
      }
    }
  }
  function handleOption(item: any, type: string): void {
    if (type === 'toppings') {
      if (toppingsChoice.includes(item as string)) {
        const choice = toppingsChoice.filter((i) => i !== item)
        setToppingsChoice(choice)
      } else {
        const choice = [...toppingsChoice, item]
        setToppingsChoice(choice)
      }
    }
    if (type === 'swirls') {
      if (swirlsChoice.includes(item)) {
        const choice = swirlsChoice.filter((i) => i !== item)
        setSwirlsChoice(choice)
      } else {
        const choice = [...swirlsChoice, item]
        setSwirlsChoice(choice)
      }
    }
  }

  return (
    <div className="flex md:w-[45rem] sm:w-[32rem] w-[23rem] overflow-auto h-39rem">
      <div className="w-0 sm:w-1/4 border-r-2 border-slate-300] bg-cover bg-[url('/images/pizzas/Pepperoni-Pizza-Recipe-Sip-Bite-Go.jpg')]">
        {/* <img
          className="w-screen"
          src="/images/Jalapeno pizza.webp"
          alt="modal pizza"
        /> */}
      </div>
      <div className="w-full h-[39rem] sm:w-3/4 flex flex-col items-center overflow-y-auto">
        <div className="w-full p-3 border-b-2 border-slate-300">
          <h1 className="text-3xl font-semibold mb-8">{data.name as string}</h1>
          <p className="mb-8">{data.description}</p>
        </div>
        {data.type === 'deals' && (
          <ChoiceSelection data={data} setDealChoices={setDealChoices} />
        )}
        {data.type === 'Loaded' && (
          <SidesOPtions
            toppingsChoice={toppingsChoice}
            setToppingsChoice={setToppingsChoice}
            swirlsChoice={swirlsChoice}
            setSwirlsChoice={setSwirlsChoice}
          />
        )}
        {data.type !== 'Loaded' && data.type !== 'deals' && (
          <div className="w-full p-6">
            <h2 className="text-xl font-semibold mb-2">
              First, select your Pizza size
            </h2>
            <Collapse isOpened={true}>
              <div className="flex gap-4">
                <div className="p-2 bg-gray-100 flex gap-2 rounded">
                  <input
                    type="radio"
                    name="size_choice"
                    value={data.price_large}
                    onChange={handleCart}
                  />
                  <label htmlFor="size_choice">{`Large ${data.price_large}`}</label>
                </div>

                {data.price_small && (
                  <div className="p-2 bg-gray-100 flex gap-2 rounded">
                    <input
                      type="radio"
                      name="size_choice"
                      value={data.price_small}
                      onChange={handleCart}
                    />
                    <label htmlFor="size_choice">{`Small ${data.price_small}`}</label>
                  </div>
                )}
              </div>
            </Collapse>
            <div className="p-3 rounded bg-gray-100 mt-2 flex justify-between">
              <h2 className="text-xl font-semibold mb-2">Choose your extras</h2>
              <button
                onClick={() =>
                  openExtra ? setOpenExtra(false) : setOpenExtra(true)
                }
                className="text-limeGreen bg-gray-100 p-1"
              >
                {openExtra ? '▲' : '▼'}
              </button>
            </div>
            <Collapse isOpened={openExtra}>
              <div className="flex flex-col gap-2 p-2 rounded bg-gray-100">
                {filteredUpgrades?.map((item: any, i: number) => (
                  <div key={`upgrade ${i}`} className="flex justify-between">
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        name={item.name}
                        value={item.name}
                        onChange={(e) => handleCart(e)}
                      />
                      <label htmlFor={item.name}>{item.name}</label>
                    </div>
                    <p>{`+ $${item.price}`}</p>
                  </div>
                ))}
              </div>
            </Collapse>
            <div className="p-3 rounded bg-gray-100 mt-2 flex justify-between">
              <div className="flex justify-between w-full">
                <h2 className="text-xl font-semibold mb-2">Toppings</h2>
                <p className="text-lg mb-2">+ $1.99 per Topping</p>
              </div>
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
              <div className="flex justify-between w-full">
                <h2 className="text-xl font-semibold mb-2">
                  Choose your Swirls
                </h2>
                <p className="text-lg mb-2">+ $0.50 per Swirl</p>
              </div>
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
        )}
        <Button
          className="p-3 w-full md:w-96 bg-limeGreen text-white my-2"
          onClick={() => handleSubmit()}
        >
          Add to order
        </Button>
        <button
          onClick={() => setModalStatus(false)}
          className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 absolute top-2 right-2"
        >
          X
        </button>
      </div>
    </div>
  )
}
