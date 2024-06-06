import { ReactNode, createContext, useState } from 'react'

export interface CartItem {
  name: string
  price: number
  upgrades: string[]
  toppings: string[]
  swirls: string[]
  quantity: number
}

export interface CartItemWithId extends CartItem {
  id: string
}

interface Props {
  children: ReactNode
}

export const CartContext = createContext({
  cart: [] as CartItemWithId[],
  addToCart: (_item: any) => {},
  deleteItem: (_id: string) => {},
  clearCart: () => {},
  addQuantity: (_id: string) => {},
  reduceQuantity: (_id: string) => {},
  calculateTotalCost: () => {},
})

export default function CartProvider({ children }: Props) {
  const [cartProducts, setCartProducts] = useState<CartItemWithId[]>([])

  function addToCart(item: any) {
    const cartItem: CartItemWithId = {
      id: item.id,
      name: item.name,
      price: item.price ? item.price : item.price_large,
      upgrades: item.upgrades ? item.upgrades : [],
      toppings: item.toppings ? item.toppings : [],
      swirls: item.swirls ? item.swirls : [],
      quantity: 1,
    }
    const found = cartProducts.find((obj) => obj.id === cartItem.id)
    if (found === undefined) {
      setCartProducts([...cartProducts, cartItem])
    }
  }

  function deleteItem(id: string) {
    console.log(id)
    const newCart = cartProducts.filter((obj) => obj.id !== id)
    setCartProducts(newCart)
  }

  function clearCart() {
    setCartProducts([])
  }

  function addQuantity(id: string) {
    const newcart = cartProducts.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    setCartProducts(newcart)
  }
  function reduceQuantity(id: string) {
    const newCart = cartProducts.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    )
    setCartProducts(newCart)
  }

  function calculateTotalCost() {
    const total: number = cartProducts.reduce(
      (accumulator: number, currentItem: CartItemWithId): number => {
        return accumulator + currentItem.price * currentItem.quantity
      },
      0
    )
    return total.toFixed(2)
  }

  const contextValue = {
    cart: cartProducts,
    addToCart,
    deleteItem,
    clearCart,
    addQuantity,
    reduceQuantity,
    calculateTotalCost,
  }

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  )
}
