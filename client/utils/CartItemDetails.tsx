import { CartItem } from '../components/CartProvider'

export default function CartItemDetails({ item }: { item: CartItem }) {
  return (
    <div className="w-full flex flex-col gap-1 bg-gray-100 p-2 ">
      <p>
        <span className="font-bold lg:text-sm text-xs">Name:</span>
        <span className="text-sm lg:text-sm text-xs">{` ${item.name}`}</span>
      </p>
      <p>
        <span className="font-bold lg:text-sm text-xs">Price:</span>
        <span className="lg:text-sm text-xs">{` $${item.price}`}</span>
      </p>

      {item.upgrades.length > 0 && (
        <p>
          <span className="font-bold lg:text-sm text-xs">Upgrades:</span>
          <span className="lg:text-sm text-xs">{` ${item.upgrades.join(
            ', '
          )}`}</span>
        </p>
      )}
      {item.toppings.length > 0 && (
        <p>
          <span className="font-bold lg:text-sm text-xs">Toppings:</span>
          <span className="lg:text-sm text-xs">{` ${item.toppings.join(
            ', '
          )}`}</span>
        </p>
      )}
      {item.swirls.length > 0 && (
        <p>
          <span className="font-bold lg:text-sm text-xs">Swirls:</span>
          <span className="lg:text-sm text-xs">{` ${item.swirls.join(
            ', '
          )}`}</span>
        </p>
      )}
    </div>
  )
}
