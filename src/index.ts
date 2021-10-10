import { AxiosRequestConfig } from './types'
import xhr from './xhr'

interface LabelledValue {
  label: string
}

function axios(config: AxiosRequestConfig): void {
  xhr(config)
}

export default axios
