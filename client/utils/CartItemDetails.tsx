import { CartItem } from '../components/CartProvider'

export default function CartItemDetails({ item }: { item: CartItem }) {
  return (
    <div>
      <p>{`Name : ${item.name}`}</p>
      <p>{`Price : ${item.price}`}</p>

      {item.upgrades.length > 0 && (
        <p>{`Extras: ${item.upgrades.join(',')}`}</p>
      )}
      {item.toppings.length > 0 && (
        <p>{`Toppings: ${item.toppings.join(',')}`}</p>
      )}
      {item.swirls.length > 0 && <p>{`Swirls: ${item.swirls.join(',')}`}</p>}
    </div>
  )
}
