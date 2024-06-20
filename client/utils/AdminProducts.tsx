import { useEffect, useRef, useState } from 'react'
import Modal from '../components/Modal'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { MenuItem } from '../../types/menu'
import { updateData } from '../../src/db'

interface Edit {
  [x: string]: string | number
}

export default function AdminProducts({ data, type }: any) {
  const [modalStatus, setModalStatus] = useState(false)
  const [product, setProduct] = useState<MenuItem>()
  const [editmode, setEditMode] = useState(false)
  const [editField, setEditfield] = useState('')

  const [input, setInput] = useState('')
  const modalRef = useRef(null)

  // console.log(product)

  useEffect(() => {
    if (modalRef.current) {
      modalStatus
        ? disableBodyScroll(modalRef.current)
        : enableBodyScroll(modalRef.current)
    }
  }, [modalStatus])

  function handleClick(item: any) {
    setModalStatus(true)
    setProduct(item)
  }

  async function updateProduct() {
    const id = product?.id as string
    const collection = type
    const update: Edit = {}
    update[editField] = input
    console.log(collection, id, update)
    await updateData(collection, id, update)
    // setProduct({ ...product, [editField]: input})
    setEditMode(false)
    setInput('')
    setEditfield('')
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value)
  }

  function openEdit(field: string): void {
    setEditMode(true)
    setEditfield(field)
  }

  return (
    <div ref={modalRef}>
      {modalStatus && (
        <div className="fixed top-0 left-0 z-10 h-screen w-screen bg-gray-800 opacity-50"></div>
      )}
      {modalStatus && (
        <Modal>
          <div className="w-auto p-6 pt-14 flex flex-col items-center">
            {!editmode && (
              <div>
                <div className="flex w-[35rem] justify-between bg-gray-200 mb-2 p-2">
                  <p className="font-bold text-lg">Name:</p>
                  <div className="flex gap-4">
                    <p className="text-limeGreen text-lg">{product?.name}</p>
                    <button onClick={() => openEdit('name')} className="w-5">
                      <img src="/editing.png" alt="edit icon" />
                    </button>
                  </div>
                </div>
                <div className="flex w-[35rem] justify-between bg-gray-200 mb-2 p-2">
                  <p className="font-bold text-lg">Category:</p>
                  <div className="flex gap-4">
                    <p className="text-limeGreen text-lg">{product?.type}</p>
                    <button onClick={() => openEdit('type')} className="w-5">
                      <img src="/editing.png" alt="edit icon" />
                    </button>
                  </div>
                </div>
                <div className="flex w-[35rem] justify-between bg-gray-200 mb-2 p-2">
                  <p className="font-bold text-lg">Description:</p>
                  <div className="flex gap-4">
                    <p className="w-64 text-limeGreen text-lg">
                      {product?.description}
                    </p>
                    <button
                      onClick={() => openEdit('description')}
                      className="w-5"
                    >
                      <img src="/editing.png" alt="edit icon" />
                    </button>
                  </div>
                </div>
                <div className="flex w-[35rem] justify-between p-2 bg-gray-200 mb-2">
                  <p className="font-bold text-lg">Price:</p>
                  <div className="flex gap-4">
                    {product?.price_large && (
                      <div>
                        <p className="text-limeGreen text-lg">
                          {product?.price_large}
                        </p>
                        <p>price large</p>
                        <button
                          onClick={() => openEdit('price_large')}
                          className="w-5"
                        >
                          <img src="/editing.png" alt="edit icon" />
                        </button>
                      </div>
                    )}
                    {product?.price_small && (
                      <div>
                        <p className="text-limeGreen text-lg">
                          {product?.price_small}
                        </p>
                        <p>price small</p>
                        <button
                          onClick={() => openEdit('price_small')}
                          className="w-5"
                        >
                          <img src="/editing.png" alt="edit icon" />
                        </button>
                      </div>
                    )}
                    {product?.price && (
                      <div>
                        <p className="text-limeGreen text-lg">
                          {product?.price}
                        </p>
                        <button
                          onClick={() => openEdit('price')}
                          className="w-5"
                        >
                          <img src="/editing.png" alt="edit icon" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {editmode && (
              <div className="flex w-[35rem] flex-col bg-gray-300 items-center justify-center p-8">
                <div className="w-72 bg-white p-4">
                  <p className="font-bold text-xl">{`Enter the ${editField} to update`}</p>
                  <p>{`Current value: ${product ? product[editField] : ''}`}</p>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={input}
                    className="rounded border-2 w-full p-2 mt-3"
                  />
                  <button
                    className="px-3 py-2 bg-limeGreen text-white text-lg font-bold rounded mt-2"
                    onClick={() => updateProduct()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
            <button
              onClick={() => {
                setModalStatus(false)
                setEditMode(false)
              }}
              className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 absolute top-2 right-2"
            >
              X
            </button>
          </div>
        </Modal>
      )}
      <div className="flex gap-4 flex-wrap bg-white">
        {data.map((item: any) => (
          <button
            key={item.name}
            onClick={() => handleClick(item)}
            className="rounded py-3 p-4 font-bold text-lg bg-slate-400"
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  )
}
