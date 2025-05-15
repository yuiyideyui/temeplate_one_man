export {}

declare global {
  type InowPlane = {
    left?: string
    right?: string
    center?: string
  }
  type IplaneMsg = {
    /**历史的plane */
    historyPlane: {
      name?: string
      left?: string
      right?: string
      center?: string
    }[]
    /**当前的plane */
    nowPlane: InowPlane
    /**当前的主题 */
    theme: string
  }
}
