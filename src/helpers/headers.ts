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
