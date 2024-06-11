// organising data according to types

import { ProductDataInterface } from '../types/productData'

const pizzas = [
  'Meat Range',
  'Chicken Range',
  'Favourite Range',
  'Seafood SaRange',
  'Veg Range',
  'Value Range',
]
const sides = ['Loaded', 'premium', 'regular']

export function sortBasedOnType(data: { type: any }[]) {
  const types = new Set(data.map((item: { type: any }) => item.type))
  const res: any = {}
  types.forEach((item) => {
    res[item] = data.filter((obj) => obj.type === item)
  })
  const output = types.has(undefined)
    ? { menu: data, hasType: false }
    : { menu: res, hasType: true }
  return output
}

export function sortMyOrders(data: any) {
  const sortedData = sortBasedOnType(data)
  const obj: ProductDataInterface = {
    pizzas: [],
    // deals: [],
    sides: [],
    desserts: [],
    drinks: [],
    // catering: []
  }
  const typesArr = Object.keys(sortedData.menu)
  typesArr.forEach((item) => {
    if (pizzas.includes(item)) {
      obj.pizzas = [...obj.pizzas, ...sortedData.menu[item]]
    } else if (sides.includes(item)) {
      obj.sides = [...obj.sides, ...sortedData.menu[item]]
    } else {
      obj[item] = [...obj[item], ...sortedData.menu[item]]
    }
  })
  return obj
}
