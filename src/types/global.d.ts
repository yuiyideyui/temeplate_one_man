export {}

declare global {
  namespace Api {
    type Response<T = any> = {
      code: number
      data: T
      msg: string
    }
  }
}
