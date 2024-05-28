// organising data according to types

export function sortBasedOnType(data: { type: any }[]) {
  const types = new Set(data.map((item: { type: any }) => item.type))
  const res: any = {}
  types.forEach((item) => {
    res[item] = data.filter((obj) => obj.type === item)
  })
  const output = types.has(undefined)
    ? { menu: data, hasType: false }
    : { menu: res, hasType: true }
  return output
}
