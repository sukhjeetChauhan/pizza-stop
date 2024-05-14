import Navigation from './Navigation'

export default function Header() {
  return (
    <>
      <section className="flex py-5 border-b-1 border-slate-300">
        <div className="ml-5">
          <img src="/vite.svg" alt="logo" />
        </div>
        <p className="text-lg text-red-500 ml-auto mr-5">cart</p>
      </section>
      <Navigation />
    </>
  )
}
