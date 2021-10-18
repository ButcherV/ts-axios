export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
}

// interface ClockInterface {
//   currentTime: Date
// }

// class Clock implements ClockInterface {
//   currentTime: Date
//   constructor(h: number, m: number) { }
// }

// interface ClockInterface {
//   currentTime: Date
//   setTime(d: Date)
// }

// class Clock implements ClockInterface {
//   currentTime: Date
//   constructor(currentTime: Date) {
//     this.currentTime = currentTime;
//   }

//   setTime(d: Date) {
//     this.currentTime = d
//   }
// }
