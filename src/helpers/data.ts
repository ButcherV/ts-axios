import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  // Only ordinary objects need to be converted to JSON format.
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  // Formdata and arraybuffer do not need to be converted, could be used directly.
  // A body of data to be sent in the XHR request: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send
  return data
}
