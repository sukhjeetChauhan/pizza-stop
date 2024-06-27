import { ReactNode, createContext, useState } from 'react'

export interface ChoiceItem {
  pizzas: string[]
  sides: string[]
  desserts: string[]
  drinks: string[]
  [key: string]: string[]
}

export interface CartItem {
  name: string
  price: number
  upgrades: string[]
  toppings: string[]
  swirls: string[]
  choice: ChoiceItem
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
    const cartIncludes = cartProducts.find((obj) => obj.id === item.id)
    const cartItem: CartItemWithId = {
      id: cartIncludes ? item.id + '_a' : item.id,
      name: item.name,
      price: item.price ? item.price : item.price_large,
      upgrades: item.upgrades ? item.upgrades : [],
      toppings: item.toppings ? item.toppings : [],
      swirls: item.swirls ? item.swirls : [],
      choice: {
        pizzas: item.choice?.pizzas ? item.choice.pizzas : [],
        sides: item.choice?.sides ? item.choice.sides : [],
        drinks: item.choice?.drinks ? item.choice.drinks : [],
        desserts: item.choice?.desserts ? item.choice.desserts : [],
      },
      quantity: 1,
    }
    const found = cartProducts.find(
      (obj) =>
        obj.id === cartItem.id ||
        (obj.id === cartItem.id.split('_')[0] &&
          JSON.stringify(obj.toppings) === JSON.stringify(cartItem.toppings))
    )

    if (found === undefined) {
      setCartProducts([...cartProducts, cartItem])
    } else {
      alert('You are adding the same item again')
    }
  }

  function deleteItem(id: string) {
    // console.log(id)
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
      item.id === id
        ? {
            ...item,
            quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
          }
        : item
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
