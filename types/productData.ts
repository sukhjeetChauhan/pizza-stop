import { MenuItem } from './menu'

export interface ProductDataInterface {
  pizzas: MenuItem[]
  'meal deals': MenuItem[]
  sides: MenuItem[]
  desserts: MenuItem[]
  drinks: MenuItem[]
  catering: MenuItem[]
  [key: string]: MenuItem[] // Index signature
}
