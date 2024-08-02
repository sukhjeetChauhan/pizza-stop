import { useState } from 'react'
import { addData } from '../../src/db'

export default function CtaReview() {
  const [nameText, setNameText] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [status, setStatus] = useState(false)

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    if (e.target.name === 'name') {
      setNameText(e.target.value)
    }
    if (e.target.name === 'review') {
      setReviewText(e.target.value)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await addData('Reviews', { name: nameText, review: reviewText })
    setNameText('')
    setReviewText('')
    setStatus(true)
  }

  return (
    <div className="flex flex-col sm:flex-row h-[70rem] sm:h-[39rem] max-w-screen-xl mx-auto my-20 lg:my-24 rounded overflow-hidden">
      <div className=" w-full sm:w-1/2 h-full bg-[url('/images/roberto-valdivia-rcUw6b4iYe0-unsplash.jpg')] bg-cover bg-center"></div>
      <div className="w-full sm:w-1/2 h-full bg-gradient-to-tl from-limeGreen to-lime-500 p-4">
        <h3 className="text-white text-3xl font-bold mt-8">
          Please help your local business by giving us feedback.
        </h3>
        <form
          className="w-full flex flex-col items-center gap-4 mt-8"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col lg:flex-row">
            <label className="text-white text-2xl w-[6rem]" htmlFor="name">
              Name :
            </label>
            <input
              className="w-[20rem] border-2 ml-2 rounded p-2"
              type="text"
              placeholder="Please type your name or type anonymous"
              name="name"
              value={nameText}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col lg:flex-row">
            <label className="text-white text-2xl w-[6rem]" htmlFor="review">
              Review :
            </label>
            <textarea
              className="w-[20rem] border-2 ml-2 rounded p-2 min-h-56"
              name="review"
              value={reviewText}
              onChange={handleChange}
            />
          </div>
          <button className="bg-white rounded text-limeGreen font-bold text-xl px-4 py-2 w-52 border-2 border-limeGreen hover:bg-gray-200">
            Submit
          </button>
        </form>
        {status && (
          <p className="text-xl text-white font-bold mt-2">
            Thank you for your review !
          </p>
        )}
      </div>
    </div>
  )
}
