import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/App.css'
import { useEffect, useRef, useState } from 'react'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import Modal from '../components/Modal'

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

  return (
    <div ref={modalRef}>
      {modalStatus && (
        <div className="fixed top-0 left-0 z-10 h-screen w-screen bg-gray-800 opacity-50"></div>
      )}
      {modalStatus && (
        <Modal setStatus={setModalStatus}>
          <h1>Landing page modal</h1>
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
