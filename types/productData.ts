import { MenuItem } from './menu'

export interface ProductDataInterface {
  pizzas: MenuItem[]
  deals: MenuItem[]
  sides: MenuItem[]
  desserts: MenuItem[]
  drinks: MenuItem[]
  catering: MenuItem[]
  [key: string]: MenuItem[] // Index signature
}
