import { Link, useLocation } from 'react-router-dom'
import Button from '../utils/Button'
import { useEffect, useState } from 'react'

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

const initialState = {
  pizzas: false,

  sides: false,
  desserts: false,
  drinks: false,
  mealdeals: false,
  catering: false,
} as activeLink

export default function Navigation() {
  const [active, setActive] = useState(initialState)
  let location = useLocation()

  useEffect(() => {
    if (location.pathname !== '/') {
      const type = location.pathname.split('/').pop()
      setActiveState(type as string)
    }
  }, [])

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

  function handleClick(item: string) {
    if (location.pathname !== '/') {
      // const item = sessionStorage.getItem('param')

      // const page = item ? JSON.parse(item) : null
      // console.log(page.name)
      // if (page !== null) {
      setActiveState(item)
    }
  }

  return (
    <div className="border border-slate-300">
      <ul className="flex list-none sm:ml-20 ml-5 flex-wrap">
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
                className={`uppercase text-xl ${
                  active[item] ? 'bg-red-500 text-white' : 'bg-white'
                }`}
                onClick={() => handleClick(item)}
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
