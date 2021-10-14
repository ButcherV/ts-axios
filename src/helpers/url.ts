import { isDate, isPlainObject } from './util'

// Chain type
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any): string {
  // Params situation 1: no pass.
  if (!params) {
    return url
  }

  //key-value array
  const parts: string[] = []

  //Get each value of the object
  Object.keys(params).forEach(key => {
    const val = params[key]

    // Params situation 2
    // params: {
    //    foo: 'bar',
    //    baz: null
    // }
    if (val === null || typeof val === 'undefined') {
      return
    }

    // Params situation 3, array type
    // params: {
    //   foo: ['bar', 'baz']
    // }
    // url: /base/get?foo[]=bar&foo[]=baz'
    let values = []

    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    const markIndex = url.indexOf('#')

    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
