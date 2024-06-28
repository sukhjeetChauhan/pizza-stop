export default function CtaReview() {
  return (
    <div className="flex h-[35rem] max-w-screen-xl mx-auto my-20 lg:my-24 rounded overflow-hidden">
      <div className="w-1/2 h-full bg-[url('/images/roberto-valdivia-rcUw6b4iYe0-unsplash.jpg')] bg-cover bg-center"></div>
      <div className="w-1/2 h-full bg-limeGreen">
        <h3>Please help your local business by giving us feedback.</h3>
        <form className="w-full flex flex-col items-center">
          <div className="flex">
            <label htmlFor="name">Name :</label>
            <input
              className="w-[20rem]"
              type="text"
              placeholder="Please type your name or type anonymous"
              name="name"
            />
          </div>
          <div className="flex">
            <label htmlFor="review">Review :</label>
            <textarea className="w-[20rem]" name="review" />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}
