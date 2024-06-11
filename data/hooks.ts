import { useQuery } from '@tanstack/react-query'
import { getData, getDataById } from '../src/db'

export function useGetData(type: string) {
  const query = useQuery({ queryKey: [type], queryFn: () => getData(type) })
  return query
}
export function useGetDataById(collection: string, id: string) {
  const query = useQuery({
    queryKey: [`${collection}-${id}`],
    queryFn: () => getDataById(collection, id),
  })
  return query
}
