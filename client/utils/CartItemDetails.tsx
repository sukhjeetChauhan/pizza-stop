import { CartItem } from '../components/CartProvider'

export default function CartItemDetails({ item }: { item: CartItem }) {
  function choicesAvailable() {
    const choiceKeys = Object.keys(item.choice)
    const lengthArr = choiceKeys.map((key) => item.choice[key].length)
    return lengthArr.some((item) => item !== 0)
  }
  return (
    <div className="w-full flex flex-col gap-1 bg-gray-100 p-2 ">
      <p>
        <span className="font-bold lg:text-sm text-xs">Name:</span>
        <span className="text-sm lg:text-sm text-xs">{` ${item.name}`}</span>
      </p>
      {choicesAvailable() && (
        <div>
          <span className="font-bold lg:text-sm text-xs">Choices:</span>
          {item.choice.pizzas.length > 0 && (
            <div className="flex gap-2">
              <span className="text-sm lg:text-sm text-xs">Pizzas :</span>
              <span className="text-sm lg:text-sm text-xs">{`${item.choice.pizzas.join(
                ', '
              )}`}</span>
            </div>
          )}

          {item.choice.sides.length > 0 && (
            <div className="flex gap-2">
              <span className="text-sm lg:text-sm text-xs">Sides :</span>
              <span className="text-sm lg:text-sm text-xs">{`${item.choice.sides.join(
                ', '
              )}`}</span>
            </div>
          )}
          {item.choice.drinks.length > 0 && (
            <div className="flex gap-2">
              <span className="text-sm lg:text-sm text-xs">Drinks :</span>
              <span className="text-sm lg:text-sm text-xs">{`${item.choice.drinks.join(
                ', '
              )}`}</span>
            </div>
          )}
          {item.choice.desserts.length > 0 && (
            <div className="flex gap-2">
              <span className="text-sm lg:text-sm text-xs">Dessert :</span>
              <span className="text-sm lg:text-sm text-xs">{`${item.choice.desserts.join(
                ', '
              )}`}</span>
            </div>
          )}
        </div>
      )}
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
