export interface menuItem {
  imageSrc: string

  title: string
  content: string
  price: string
  rating: string
  reviews: string
  url: string
}

export interface MenuItem {
  [x: string]: string | number
  id: string
  name: string
  price: string
  // rating: number
  imgUrl: string
  description: string
}
export interface NewMenuItem {
  name: string
  price?: string
  price_small?: string
  price_large?: string
  type: string
  imgUrl: string
  description: string
}
