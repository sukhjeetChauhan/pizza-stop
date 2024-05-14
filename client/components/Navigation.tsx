import Button from '../utils/Button'

const pages = ['pizzas', 'meal deals', 'sides', 'deserts', 'drinks', 'catering']

export default function Navigation() {
  return (
    <div className="border border-slate-300">
      <ul className="flex list-none ml-20 ">
        {pages.map((item) => (
          <li className="p-3 border border-slate-300">
            <Button className="bg-white text-red-500 uppercase">{item}</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
