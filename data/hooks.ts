import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getData, getDataById, updateData } from '../src/db'

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

export default function useUpdateData(
  type: string,
  collection: string,
  id: string
) {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => updateData(collection, id, data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [type] })
    },
  })
}
