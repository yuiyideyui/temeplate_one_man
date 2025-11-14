export {}

declare global {
  type InowPlane = {
    left?: string
    right?: string
    center?: string
    theme?: string
    // data?: any
  }
  type IplaneMsg = {
    /**历史的plane */
    historyPlane: (InowPlane & { data?: any })[]
    /**当前的plane */
    nowPlane: InowPlane
    /**当前的主题 */
    theme: string
  }
}
