import { AxiosRequestConfig, AxiosPromise } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeader } from './helpers/headers'

interface LabelledValue {
  label: string
}

function axios(config: AxiosRequestConfig): AxiosPromise {
  // console.log(config.data)
  processConfig(config)
  // console.log(config.data)
  return xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // The execution order of transformHeaders needs to be before transformRequestData.
  // Because transformheaders need to judge whether the data is a plain object.
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  // Headers is an option. It may not be transmitted at all
  // It needs to be an empty object by default.
  const { headers = {}, data } = config
  return processHeader(headers, data)
}

export default axios
