export function isEmpty(value: any): boolean {
  if (value == null) return true // null 或 undefined
  if (typeof value === 'string' && value.trim() === '') return true // 空字符串
  if (Array.isArray(value) && value.length === 0) return true // 空数组
  if (value instanceof Map || value instanceof Set) return value.size === 0 // 空 Map 或 Set
  if (typeof value === 'object' && Object.keys(value).length === 0) return true // 空对象
  return false
}
