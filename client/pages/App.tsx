import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/App.css'
import { useEffect, useRef, useState } from 'react'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import Modal from '../components/Modal'
import Button from '../utils/Button'

export default function App() {
  const [modalStatus, setModalStatus] = useState(true)
  const modalRef = useRef(null)
  useEffect(() => {
    if (modalRef.current) {
      modalStatus
        ? disableBodyScroll(modalRef.current)
        : enableBodyScroll(modalRef.current)
    }
  }, [modalStatus])

  function handleOption() {
    setModalStatus(false)
  }

  return (
    <div ref={modalRef}>
      {modalStatus && (
        <div className="fixed top-0 left-0 z-10 h-screen w-screen bg-gray-800 opacity-50"></div>
      )}
      {modalStatus && (
        <Modal>
          <div>
            <h1>Landing page modal</h1>
            <Button
              className="p-3 w-96 bg-green-500 text-white my-2"
              onClick={handleOption}
            >
              Done
            </Button>
          </div>
        </Modal>
      )}
      <Header />

      <div className="app">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
