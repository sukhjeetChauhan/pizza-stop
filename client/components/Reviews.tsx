import { useGetData } from '../../data/hooks'
import Spinner from '../utils/Spinner'
import Star from '../utils/StarSvg'

interface Review {
  id: string
  name: string
  ratings: number
  review: string
}

export default function Reviews() {
  const { data: reviews, isLoading } = useGetData('Reviews')
  const ratingsArr = [1, 2, 3, 4, 5]

  if (isLoading) {
    return <Spinner />
  }

  if (reviews) {
    return (
      <div className="bg-slate-100 w-full h-full flex flex-col items-center justify-center">
        <div className="rounded shadow-lg w-[94%] h-[90%] bg-white overflow-y-scroll">
          {reviews.map((review: Review) => (
            <div key={review.id} className="p-6 rounded bg-lime-100 m-6">
              <div className="flex justify-between">
                <h1 className="text-xl font-bold text-limeGreen capitalize mb-4">
                  {review.name}
                </h1>
                <div className="flex gap-3">
                  {ratingsArr.map((rating) => (
                    <div key={rating}>
                      <Star
                        starColor={rating <= review.ratings ? 'gold' : 'grey'}
                        width={16}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <p className="italic text-lg">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
