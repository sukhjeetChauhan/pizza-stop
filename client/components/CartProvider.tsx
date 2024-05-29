import { createContext, useState } from 'react'

export interface CartItem {
  name: string
  price: number
  upgrades?: string[]
  quantity?: number
}

export interface CartItemWithId extends CartItem {
  id: number
}

export const CartContext = createContext({
  cart: [] as CartItemWithId[],
  addToCart: (_item: any) => {},
  deleteItem: (_name: string) => {},
  clearCart: () => {},
  addQuantity: (_id: number) => {},
  reduceQuantity: (_id: number) => {},
  calculateTotalCost: () => {},
})

export default function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState<CartItemWithId[]>([])

  function addToCart(item: any) {
    const cartItem: CartItemWithId = {
      id: cartProducts.length,
      name: item.name,
      price: item.price ? item.price : item.price_large,
      upgrades: [],
      quantity: 1,
    }

    setCartProducts([...cartProducts, cartItem])
  }

  function deleteItem(name: string) {
    const newCart = cartProducts.filter((obj) => obj.name !== name)
    setCartProducts(newCart)
  }

  function clearCart() {
    setCartProducts([])
  }

  function addQuantity(id: number) {
    const newcart = cartProducts.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    setCartProducts(newcart)
  }
  function reduceQuantity(id: number) {
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
    return total
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
