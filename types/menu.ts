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
  id: number
  name: string
  price: number
  rating: number
  imgUrl: string
  description: string
}
