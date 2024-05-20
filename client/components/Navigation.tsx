import { Link } from 'react-router-dom'
import Button from '../utils/Button'

const pages = [
  'pizzas',
  'meal deals',
  'sides',
  'desserts',
  'drinks',
  'catering',
]

export default function Navigation() {
  return (
    <div className="border border-slate-300">
      <ul className="flex list-none ml-20 ">
        {pages.map((item) => (
          <li key={item} className="p-3 border border-slate-300">
            <Link to={`/order/${item}`}>
              <Button className="bg-white text-red-500 uppercase">
                {item}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
