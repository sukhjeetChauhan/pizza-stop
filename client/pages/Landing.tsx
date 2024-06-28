import Features from '../components/Features'
// import Menu from '../components/Menu'
import Button from '../utils/Button'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import Modal from '../components/Modal'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import * as storage from '../../data/localStorage'
import ContentWrapper from '../utils/ContentWrapper'
import { getCoords } from '../../src/appApi'
import calculateAddressDistance from '../../src/geoLib'
import CtaReview from '../components/CtaReview'
export default function Landing() {
  const [modalStatus, setModalStatus] = useState(true)
  const [deliverStatus, setDeliverStatus] = useState(true)
  const [address, setAddress] = useState<string>('')

  const modalRef = useRef(null)
  useEffect(() => {
    if (modalRef.current) {
      modalStatus
        ? disableBodyScroll(modalRef.current)
        : enableBodyScroll(modalRef.current)
    }
  }, [modalStatus])

  useEffect(() => {
    const storageData = storage.getLocalStorage()
    if (storageData !== null) {
      setModalStatus(false)
    }
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAddress(e.target.value)
  }

  async function handleOption() {
    const storageObj = {
      address: deliverStatus ? address : '',
      order: deliverStatus ? 'Deliver' : 'Pickup',
      deliveryFee: deliverStatus ? 5.99 : 0,
    }
    if (deliverStatus && address !== '') {
      const coords = await getCoords(address)
      const distance = calculateAddressDistance(coords)
      if (distance > 20) {
        alert(`We are not able to deliver that far`)
      } else if (distance > 5) {
        storageObj.deliveryFee = Number((5.99 + (distance - 5)).toFixed(2))
        alert(
          `Please beware your delivery cost will be ${storageObj.deliveryFee.toFixed(
            2
          )}`
        )
        storage.setLocalStorage(storageObj)
        setModalStatus(false)
      } else {
        console.log(storageObj)
        storage.setLocalStorage(storageObj)
        setModalStatus(false)
      }
    }
    if (deliverStatus && address === '') {
      alert('Please enter an address or choose pickup')
    }

    if (!deliverStatus) {
      storage.setLocalStorage(storageObj)
      setModalStatus(false)
    }
  }

  function setDelivery() {
    setDeliverStatus(true)
  }
  function setPickUp() {
    setDeliverStatus(false)
  }

  const smoothTransition = `transition-all duration-700 ease-in-out overflow-hidden ${
    deliverStatus ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
  }`

  return (
    <ContentWrapper>
      <div ref={modalRef}>
        {modalStatus && (
          <div className="fixed top-0 left-0 z-10 h-screen w-screen bg-gray-800 opacity-50"></div>
        )}
        {modalStatus && (
          <Modal>
            <div className="w-96 flex flex-col items-center">
              <div className="p-7 border-b-2 border-slate-300">
                <h1 className="text-xl font-semibold">
                  How would you like to proceed?
                </h1>
              </div>

              <div className="p-7 w-full flex flex-col items-center gap-4">
                <div className="flex bg-slate-300 rounded-full w-48 justify-between p-1">
                  <button
                    className={`transition-all duration-700 ease-in-out rounded-full px-3 w-1/2 ${
                      deliverStatus ? 'bg-white' : ''
                    } text-sm`}
                    onClick={setDelivery}
                  >
                    <div className="flex flex-col items-center">
                      <span className="font-semibold">Delivery</span>
                      <span className="text-xs">30 mins</span>
                    </div>
                  </button>
                  <button
                    className={`transition-all duration-700 ease-in-out rounded-full px-3 w-1/2 text-sm ${
                      !deliverStatus ? 'bg-white' : ''
                    }`}
                    onClick={setPickUp}
                  >
                    <div className="flex flex-col items-center">
                      <span className="font-semibold">Pick Up</span>
                      <span className="text-xs">20 mins</span>
                    </div>
                  </button>
                </div>

                {/* {deliverStatus && (
                <input
                  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                />
              )} */}
                <input
                  className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm ${smoothTransition}`}
                  id="address"
                  type="text"
                  onChange={handleChange}
                  value={address}
                  placeholder="Enter your address"
                />
              </div>
              <div>
                <Button
                  className="p-3 w-72 bg-limeGreen text-white my-2 text-base"
                  onClick={handleOption}
                >
                  Done
                </Button>
              </div>
            </div>
          </Modal>
        )}

        <div className="h-screen-minus-header bg-[url('/images/background.jpg')] bg-cover bg-center flex items-center justify-center">
          <Link to="/order/pizzas">
            <Button className="bg-white uppercase lato-700 text-red-500 text-xl p-4 mt-40 w-80 hover:shadow-2xl hover:bg-gray-200">
              Order Now
            </Button>
          </Link>
        </div>
        <Features />
        <CtaReview />
      </div>
    </ContentWrapper>
  )
}
