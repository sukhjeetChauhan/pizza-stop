import { Link } from 'react-router-dom'
import Button from '../utils/Button'
import { useState } from 'react'

const pages = ['pizzas', 'sides', 'desserts', 'drinks']

interface activeLink {
  pizzas: boolean
  mealdeals: boolean
  sides: boolean
  desserts: boolean
  drinks: boolean
  catering: boolean
  [key: string]: boolean
}

const initialState = {} as activeLink
pages.forEach((page) => (initialState[page] = false))

export default function Navigation() {
  const [active, setActive] = useState(initialState)

  function setActiveState(page: keyof activeLink) {
    const newActive = { ...active }
    Object.keys(newActive).forEach((prop) => {
      newActive[prop as keyof activeLink] = false
    })

    // Set the chosen key to true
    newActive[page] = true

    // set new active state
    setActive(newActive)
  }

  return (
    <div className="border border-slate-300">
      <ul className="flex list-none ml-20 ">
        {pages.map((item) => (
          <li
            key={item}
            className={`p-3 border border-slate-300  ${
              active[item]
                ? 'bg-red-500 text-white'
                : 'bg-white hover:text-red-500'
            }`}
          >
            <Link to={`/order/${item}`}>
              <Button
                className={`uppercase  ${
                  active[item] ? 'bg-red-500 text-white' : 'bg-white'
                }`}
                onClick={() => setActiveState(item)}
              >
                {item}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
