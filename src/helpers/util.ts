const toString = Object.prototype.toString

// Type protection: val is Date
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Date {
  return val !== null && typeof val === 'object'
}
