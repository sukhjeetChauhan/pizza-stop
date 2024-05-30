import { useQuery } from "@tanstack/react-query";
import { getData } from "../src/db";

export function useGetData(type:string){
  const query = useQuery({ queryKey: [type], queryFn: ()=>getData(type) })
  return query
}