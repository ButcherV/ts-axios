import { isPlainObject } from './util'

//  Headers Format:
//  axios({
//     method: 'post',
//     url: '/base/post',
//     headers: {
//         'xxx': 'ddd',
//         'content-type': 'application/json;charset=utf-8', // Incoming is case insensitive
//         'xxx': 'ddd',
//         'xxx': 'ddd',
//     },
//     data: {
//         a: 1,
//         b: 2
//     }
//  })

// Solve the case inconsistency
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

// Judge whether it is an ordinary object.
// If so, 'content-type' could be added to the header
export function processHeader(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-type')

  if (isPlainObject(data)) {
    // Even if the user does not pass the headers,
    // if the data passed is an ordinary object, we also need to process the headers
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

// From:

// "connection: keep-alive\r\ncontent-length: 13\r\ncontent-type: application/json; charset=utf-8\r\ndate: 'Fri, 05 Apr 2019 12:40:49 GMT'

// To:

// {
//   date: 'Fri, 05 Apr 2019 12:40:49 GMT'
//   etag: 'W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"',
//   connection: 'keep-alive',
//   'x-powered-by': 'Express',
//   'content-length': '13'
//   'content-type': 'application/json; charset=utf-8'
// }

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    console.log('key', key)
    if (!key) {
      return
    }
    key = key.trim().toLowerCase()
    val = val.trim()
    parsed[key] = val
  })

  return parsed
}
