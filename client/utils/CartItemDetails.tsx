import { CartItem } from '../components/CartProvider'

export default function CartItemDetails({ item }: { item: CartItem }) {
  return (
    <div className="w-full flex flex-col gap-1 bg-gray-100 p-2 ">
      <p>
        <span className="font-bold text-md">Name:</span>
        <span className="text-sm">{` ${item.name}`}</span>
      </p>
      <p>
        <span className="font-bold text-md">Price:</span>
        <span className="text-sm">{` $${item.price}`}</span>
      </p>

      {item.upgrades.length > 0 && (
        <p>
          <span className="font-bold text-md">Upgrades:</span>
          <span className="text-sm">{` ${item.upgrades.join(', ')}`}</span>
        </p>
      )}
      {item.toppings.length > 0 && (
        <p>
          <span className="font-bold text-md">Toppings:</span>
          <span className="text-sm">{` ${item.toppings.join(', ')}`}</span>
        </p>
      )}
      {item.swirls.length > 0 && (
        <p>
          <span className="font-bold text-md">Swirls:</span>
          <span className="text-sm">{` ${item.swirls.join(', ')}`}</span>
        </p>
      )}
    </div>
  )
}
