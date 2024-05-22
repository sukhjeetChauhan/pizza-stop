// import { Icons } from "@/components/ui/icons";
// import Image from "next/image";
// import Link from "next/link";
interface Nav {
  label: string
  path: string
}

import { Link } from 'react-router-dom'

const informationNav: Nav[] = [
  { label: 'About Us', path: '/about-us' },

  { label: 'Contact Us', path: '/contact-us' },
  { label: 'Site Map', path: '/site-map' },
]

const accountNav: Nav[] = [
  { label: 'Order History', path: '/order-history' },
  { label: 'Wish List', path: '/wishlist' },
  { label: 'Special Offers', path: '/special-offers' },
]

export default function Footer() {
  return (
    <footer className="text-white">
      <div className="bg-gray-700 flex justify-center">
        <div className="container px-10 pt-14 pb-12 grid grid-cols-9 gap-5 md:gap-10 justify-between md:justify-start">
          <div className="space-y-3 md:space-y-6 text-center xl:text-left col-span-12 xl:col-span-4">
            <h5 className="text-xl font-medium">Order Online</h5>
            <p className="text-gray-400">
              Hi, you can order online or just give us a call:
            </p>
            <address className="flex flex-wrap not-italic gap-y-5 justify-between">
              <dl className="space-y-1 bg-gray-600 py-4 px-3 xl:p-0 xl:bg-transparent rounded xl:rounded-none w-full sm:w-[calc(100%/2-10px)] lg:w-[calc(100%/4-12px)] xl:w-[calc(100%/2-30px-1px)]">
                <dt className="uppercase text-xs text-gray-400">
                  Phone number
                </dt>
                <dd className="text-sm">09 601 6100</dd>
              </dl>
              <dl className="space-y-1 bg-gray-600 py-4 px-3 xl:p-0 xl:bg-transparent rounded xl:rounded-none w-full sm:w-[calc(100%/2-10px)] lg:w-[calc(100%/4-12px)] xl:w-[calc(100%/2-30px-1px)]">
                <dt className="uppercase text-xs text-gray-400">
                  Email address
                </dt>
                <dd className="text-sm break-words">pizzastop@myvo.one</dd>
              </dl>
              <dl className="space-y-1 bg-gray-600 py-4 px-3 xl:p-0 xl:bg-transparent rounded xl:rounded-none w-full sm:w-[calc(100%/2-10px)] lg:w-[calc(100%/4-12px)] xl:w-[calc(100%/2-30px-1px)]">
                <dt className="uppercase text-xs text-gray-400">
                  Our Location
                </dt>
                <dd className="text-sm">126 Rodney Street, Wellsford 0900</dd>
              </dl>
              <dl className="space-y-1 bg-gray-600 py-4 px-3 xl:p-0 xl:bg-transparent rounded xl:rounded-none w-full sm:w-[calc(100%/2-10px)] lg:w-[calc(100%/4-12px)] xl:w-[calc(100%/2-30px-1px)]">
                <dt className="uppercase text-xs text-gray-400">
                  Working hours
                </dt>
                <dd className="text-sm">Every day 11:30 AM - 8:00 PM</dd>
              </dl>
            </address>
          </div>
          <div className="space-y-3 md:space-y-6 text-center md:text-start mx-auto col-span-6 md:col-span-3 xl:col-span-2">
            <h5 className="text-xl font-medium">Information</h5>
            <div className="gap-3 flex flex-col">
              {informationNav.map((nav) => (
                <Link
                  key={nav.label}
                  to={{ pathname: nav.path }}
                  className="text-[15px] text-gray-400 hover:text-white transition-colors duration-200 inline-block"
                >
                  {nav.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-3 md:space-y-6 text-center md:text-start mx-auto col-span-6 md:col-span-3 xl:col-span-2">
            <h5 className="text-xl font-medium">My Account</h5>
            <div className="gap-3 flex flex-col">
              {accountNav.map((nav) => (
                <Link
                  key={nav.label}
                  to={{ pathname: nav.path }}
                  className="text-[15px] text-gray-400 hover:text-white transition-colors duration-200 inline-block"
                >
                  {nav.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 flex justify-center">
        <div className="container py-5 flex items-center justify-center md:justify-between flex-wrap gap-5">
          <p className="text-sm text-gray-400 md:text-start text-center">
            &copy; {new Date().getFullYear()} All Rights Reserved. Developed by
            &nbsp;
            <Link
              to="https://github.com/sukhjeetChauhan"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-brand whitespace-nowrap"
            >
              New Era Creations
            </Link>
          </p>

          <img
            height={56}
            width={350}
            className=" p-2 bg-gray-200"
            src="https://www.leafrootfruit.com.au/wp-content/uploads/2018/08/secure-stripe-payment-logo-amex-master-visa.png"
            alt="Stripe Secure Payment"
          />
        </div>
      </div>
    </footer>
  )
}
