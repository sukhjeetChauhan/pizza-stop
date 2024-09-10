import { SetStateAction } from 'react'
import Header from '../components/Header'
import { Link, Outlet } from 'react-router-dom'

export default function Admin() {
  const adminMenu = [
    {
      item: 'My Orders',
      link: '/admin/dashboard',
    },
    {
      item: 'My Products',
      link: '/admin/manageProducts',
    },
    {
      item: 'My Reviews',
      link: '/admin/reviews',
    },
  ]
  return (
    <>
      <Header
        cartView={false}
        setCartView={function (_value: SetStateAction<boolean>): void {
          throw new Error('Function not implemented.')
        }}
      />
      <div className="flex h-screen-minus-dashboard-header">
        <div className="w-1/5 h-full border-r-2 border-t-2 border-slate-300 flex flex-col items-center">
          {adminMenu.map((item) => (
            <Link to={item.link} key={item.item}>
              <button className=" rounded py-4 w-48 lg:w-72 mt-4 text-black bg-white text-2xl font-bold hover:bg-red-100 hover:text-red-500">
                {item.item}
              </button>
            </Link>
          ))}
        </div>
        <div className="w-4/5 h-full bg-slate-100 border-t-2 border-slate-300">
          <Outlet />
        </div>
      </div>
    </>
  )
}
