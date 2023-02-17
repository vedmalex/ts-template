export function $contains<T>(value: T, ...possible: Array<T>) {
  // repetition which goes over all the elements in the "possible" array
  return +['||', [possible], (item: T) => value === item]
}
