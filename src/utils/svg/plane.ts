
/**
 *
 * @param { number } width 宽度number
 * @param { number } height 高度number
 * @param { string } lineColor 线的颜色string
 * @param { string } blockColor 块的颜色string
 * @param { array } lineargradientColor 背景色渐变array
 * @returns {base64}
 */
export const panelSvg = (width:number,height:number,lineColor:string,blockColor:string,lineargradientColor:any[]) => {
  let topimageWidth = Number(width)
  let topimageHeight = Number(height)
  let Width = 0 //减少或增加的宽度
  let Height = 0 //高度
  // let LineColor = '#00E0FF'
  // let LineColor = '#FF5631'
  let LineColor = lineColor
  // let BlockColor = '#4CEAFF'
  // let BlockColor = '#FF5631'
  let BlockColor = blockColor
  // let linearGradientColor = ['#002D40','#003769']
  // let linearGradientColor = ['#0E0200', '#690000']
  let linearGradientColor = lineargradientColor

  Width = 415 - topimageWidth
  Height = 361 - topimageHeight

  let yui = `
  <svg
      width="${topimageWidth + 1}"
      height="${topimageHeight}"
      viewBox="0 0 ${topimageWidth + 1} ${topimageHeight}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
  >

      <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M ${-Width + 222.841} 0 H ${-Width + 355.633} L ${-Width + 351.465} 6.60342 H ${-Width + 226.496} L ${-Width + 222.841} 0 Z"
          fill="${LineColor}"
      />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6491 ${-Height + 357.196}L1.68761 ${-Height + 346.124}L2 22.4145L19.7418 2.20312H${-Width + 215.198}L${-Width + 222.852} 8.00912H${-Width + 355.034}L${-Width + 362.286} 2.20312H${-Width + 404.683}L${-Width + 413.5} 11.3959V${-Height + 337.128}L${-Width + 396.946} ${-Height + 357.504}H${-Width + 387.274}L${-Width + 378.892} ${-Height + 348.2}H${-Width + 290.555}L${-Width + 280.238} ${-Height + 358.788}L12.6491 ${-Height + 357.196}Z" fill="url(#paint0_linear_738_8212)" fill-opacity="0.95"/>
      <path
          d="M1 41.8236 V 24.9015 L 19.594 2.20312 H ${-Width + 215.798} L ${-Width + 223.128} 11.1523 H ${-Width + 354.153} L ${-Width + 361.484} 2.20312 H ${-Width + 404.537} L ${-Width + 415} 14.9761 V 41.8236"
          stroke="${LineColor}"
          stroke-width="1.8"
      />

      <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M${-Width + 307.06} ${-Height + 354.395}L${-Width + 302.235} ${-Height + 360.998} H ${-Width + 286.894}L${-Width + 292.152} ${-Height + 354.395}H${-Width + 307.06}ZM${-Width + 324.753} ${-Height + 354.395}L${-Width + 319.928} ${-Height + 360.998}H${-Width + 304.586}L${-Width + 309.844} ${-Height + 354.395}H${-Width + 324.753}ZM${-Width + 343.311} ${-Height + 354.395}L${-Width + 338.486} ${-Height + 360.998}H${-Width + 323.144}L${-Width + 328.403} ${-Height + 354.395}H${-Width + 343.311}ZM${-Width + 361.127} ${-Height + 354.395}L${-Width + 356.302} ${-Height + 360.998}H${-Width + 340.96}L${-Width + 346.219} ${-Height + 354.395}H${-Width + 361.127}ZM${-Width + 374.861} ${-Height + 354.395}L${-Width + 379.067} ${-Height + 360.998}H${-Width + 359.271}L${-Width + 364.035} ${-Height + 354.395}H${-Width + 374.861}Z"
          fill="${BlockColor}"
      />
      <path
          d="M 1 ${-Height + 319.164} V ${-Height + 344.905} L 12.263 ${-Height + 358.785} H ${-Width + 280.51} L ${-Width + 288.707} ${-Height + 349.363} H ${-Width + 378.478} L ${-Width + 386.742} ${-Height + 358.785} H ${-Width + 396.473} L ${-Width + 415} ${-Height + 335.567} V ${-Height + 319.164}"
          stroke="${LineColor}"
          stroke-width="1.8"
      />
      <defs>
          <linearGradient
              id="paint0_linear_738_8212"
              x1="207.374"
              y1="2.24044"
              x2="209.633"
              y2="436.011"
              gradientUnits="userSpaceOnUse"
          >
              <stop stop-color="${linearGradientColor[0]}" />
              <stop
                  offset="1"
                  stop-color="${linearGradientColor[1]}"
              />
          </linearGradient>
      </defs>
  </svg>
  `
  const base64Code = btoa(yui);
  return `url(data:image/svg+xml;base64,${base64Code})`
}
