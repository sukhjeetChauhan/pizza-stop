import Button from '../utils/Button'
import { MenuItem } from '../../types/menu'
import { Collapse } from 'react-collapse'
import '../styles/CustomizedOrder.css'

import { useGetData } from '../../data/hooks'
import { useContext, useState } from 'react'
import { CartContext, CartItem } from './CartProvider'

export default function CustomizedOrder({
  data,
  setModalStatus,
}: {
  data: MenuItem
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { data: upgrades, isLoading, isError } = useGetData('upgrades')

  const initialState: CartItem = {
    name: data.name,
    price: data.price_large as number,
    quantity: 1,
  }
  const [cartItem, setCartItem] = useState(initialState)
  const [upgradeCart, setUpgradeCart] = useState<CartItem[]>([])

  const cart = useContext(CartContext)

  if (isLoading) {
    return <p>Loading ......</p>
  }

  if (isError) {
    console.log('Error occured')
  }

  function findItem(item: string, data: CartItem[]) {
    const res = data.find((i) => i.name === item)
    return { data: res, status: res ? true : false }
  }

  function handleSubmit() {
    const upgradeArr = upgradeCart.map((item) => item.name)
    const upgradeCost = upgradeCart.reduce((a, c) => a + Number(c.price), 0)
    console.log(upgradeArr)
    const finalCartItem = {
      ...cartItem,
      upgrades: upgradeArr,
      price: (Number(cartItem.price) + upgradeCost).toFixed(2),
    }
    cart.addToCart(finalCartItem)

    setModalStatus(false)
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
          (i: CartItem) => i.name !== upgradeItem.name
        )
        setUpgradeCart(newUpgradeCart)
      }
    }
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
                <input
                  type="radio"
                  name="size_choice"
                  value={data.price_large}
                  onChange={handleCart}
                />
                <label htmlFor="size_choice">{`Large ${data.price_large}`}</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="size_choice"
                  value={data.price_small}
                  onChange={handleCart}
                />
                <label htmlFor="size_choice">{`Small ${data.price_small}`}</label>
              </div>
            </div>
          </Collapse>
          <h2 className="text-xl font-semibold">Choose your extras</h2>
          <Collapse isOpened={true}>
            <div>
              {upgrades?.map((item: any, i: number) => (
                <div key={`upgrade ${i}`} className="flex justify-between">
                  <div>
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
