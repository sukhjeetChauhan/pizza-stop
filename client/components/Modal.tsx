// import '../styles/Modal.css'

interface ModalProps {
  children: React.ReactNode
  // setStatus: React.Dispatch<React.SetStateAction<boolean>> // Specify the type for the 'showModal' prop
}

export default function Modal({ children }: ModalProps) {
  return (
    <div className="shadow-md fixed max-w-screen top-32 left-1/2 transform -translate-x-1/2 bg-white z-40 text-black rounded-lg overflow-x-hidden max-h-[calc(100vh-5rem)] overflow-y-auto">
      {children}
    </div>
  )
}
