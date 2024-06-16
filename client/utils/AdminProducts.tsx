export default function AdminProducts({ data }: any) {
  return (
    <div className="flex gap-4 flex-wrap bg-white">
      {data.map((item: any) => (
        <button className="rounded py-3 p-4 font-bold text-lg bg-slate-400">
          {item.name}
        </button>
      ))}
    </div>
  )
}
