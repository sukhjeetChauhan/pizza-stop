import Button from '../utils/Button'

export default function Landing() {
  return (
    <div className="min-h-screen bg-[url('public/images/landingPizza.jpg')] bg-cover bg-center flex items-center justify-center">
      <Button className="bg-white text-red-500 text-xl p-4 mt-40 w-[16.5rem]">
        Order Now
      </Button>
    </div>
  )
}
