import { Link, useLocation } from 'react-router-dom'
import Button from '../utils/Button'
import { useEffect, useState } from 'react'
import { auth } from '../../src/firebase.config'

const pages = ['pizzas', 'sides', 'desserts', 'drinks', 'deals']
const userKey = import.meta.env.VITE_DASHBOARD_KEY

interface activeLink {
  pizzas: boolean
  deals: boolean
  sides: boolean
  desserts: boolean
  drinks: boolean
  // catering: boolean
  dashboard: boolean
  [key: string]: boolean
}

const initialState = {
  pizzas: false,
  dashboard: false,
  sides: false,
  desserts: false,
  drinks: false,
  deals: false,
  // catering: false,
} as activeLink

export default function Navigation() {
  const [active, setActive] = useState(initialState)
  const user = auth.currentUser
  const userId = user?.uid

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
    <div className="flex justify-between items-center border border-slate-300">
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
                {item === 'deals' ? 'Meal Deals' : item}
              </Button>
            </Link>
          </li>
        ))}
        {userId === userKey && (
          <li
            className={`p-3 border border-slate-300  ${
              active.dashboard
                ? 'bg-red-500 text-white'
                : 'bg-white hover:text-red-500'
            }`}
          >
            <Link to={`/admin/dashboard`}>
              <Button
                className={`uppercase text-xl ${
                  active.dashboard ? 'bg-red-500 text-white' : 'bg-white'
                }`}
                onClick={() => handleClick('dashboard')}
              >
                dashboard
              </Button>
            </Link>
          </li>
        )}
      </ul>
      {location.pathname !== '/' && (
        <p key="phone" className="text-red-500 text-xl mr-4 font-bold">
          09 601 6100
        </p>
      )}
    </div>
  )
}
