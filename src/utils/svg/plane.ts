

export const panelSvg = (width = 452, height = 917) => {

  let diffH = 917 - height  //高度差值
  //  55 230
  let diffW = 452 - width //高度差值
  let planeSvg = "M 17.9673 2.28465 L 2.30123 17.5876 C 2.1086 17.7758 2 18.0336 2 18.3029 V 898.929 C 2 899.481 2.44772 899.929 3 899.929 H 34.6596 C 34.8892 899.929 35.1118 900.008 35.29 900.153 L 55.7635 916.776 H 232.886 C 233.147 917 233.398 916.898 233.585 916.715 L 245.065 905.501 C 245.252 905.319 245.503 905.217 245.764 905.217 H 378.166 C 378.427 905.217 378.678 905.319 378.865 905.501 L 390.345 916.715 C 390.532 916.898 390.783 917 391.044 917 H 439.53 C 439.791 917 440.042 916.898 440.228 916.715 L 451.699 905.511 C 451.891 905.323 452 905.065 452 904.796 L 452 24.4606 C 452 23.9083 451.552 23.4606 451 23.4606 H 403.935 C 403.625 23.4606 403.333 23.317 403.143 23.0718 L 390.937 7.26617 C 390.747 7.02098 390.455 6.8774 390.145 6.8774 H 378.573 H 245.551 C 245.423 6.8774 245.295 6.85264 245.176 6.80449 L 233.474 2.07291 C 233.355 2.02476 233.228 2 233.099 2 H 18.6661 C 18.4049 2 18.1542 2.10216 17.9673 2.28465 Z"
  let spPlane = planeSvg.split(' ')

  let icon1Svg = 'M 452 891 V 905.572 C 452 905.845 451.888 906.107 451.69 906.295 L 439.717 917.723 C 439.531 917.901 439.284 918 439.027 918 H 423.711'
  let spIcon1Svg = icon1Svg.split(' ')

  let icon2Svg = 'M 378.211 909 H 249.617 C 249.36 909 249.113 909.099 248.927 909.277 L 241.069 916.777 C 240.416 917.4 240.857 918.5 241.759 918.5 H 370.353 C 370.61 918.5 370.857 918.401 371.043 918.223 L 378.901 910.723 C 379.554 910.1 379.113 909 378.211 909 Z'
  let spIcon2Svg = icon2Svg.split(' ')

  let icon3Svg = 'M 242.529 2 H 378.123 C 378.242 2 378.361 2.02146 378.473 2.06335 L 383.821 4.06335 C 384.865 4.45349 384.585 6 383.471 6 H 247.877 C 247.758 6 247.639 5.97854 247.527 5.93665 L 242.179 3.93665 C 241.135 3.54651 241.415 2 242.529 2 Z'
  let spIcon3Svg = icon3Svg.split(' ')

  if (diffH !== 0) {
    planeSvg.split(' ').forEach((e: any, index: number) => {
      if (Number(e) > 870) {
        spPlane[index] = Number(e) - diffH
      }
    })
    icon1Svg.split(' ').forEach((e: any, index: number) => {
      if (Number(e) > 870) {
        spIcon1Svg[index] = Number(e) - diffH

      }
    })
    icon2Svg.split(' ').forEach((e: any, index: number) => {
      if (Number(e) > 870) {
        spIcon2Svg[index] = Number(e) - diffH
      }
    })
  }
  if (diffW !== 0) {
    planeSvg.split(' ').forEach((e: any, index: number) => {
      if (500 > Number(e) && Number(e) > 56) {
        spPlane[index] = Number(e) - diffW
      }
    })
    icon1Svg.split(' ').forEach((e: any, index: number) => {
      if (700 > Number(e) && Number(e) > 56) {
        spIcon1Svg[index] = Number(e) - diffW
      }
    })
    icon2Svg.split(' ').forEach((e: any, index: number) => {
      if (700 > Number(e) && Number(e) > 56) {
        spIcon2Svg[index] = Number(e) - diffW
      }
    })
    icon3Svg.split(' ').forEach((e: any, index: number) => {
      if (700 > Number(e) && Number(e) > 56) {
        spIcon3Svg[index] = Number(e) - diffW
      }
    })
  }

  planeSvg = spPlane.join(' ')
  icon1Svg = spIcon1Svg.join(' ')
  icon2Svg = spIcon2Svg.join(' ')
  icon3Svg = spIcon3Svg.join(' ')



  let yui = `
  <svg width="${width + 2}" height="${height + 3}" viewBox="0 0 ${width + 2} ${height + 3}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="${planeSvg}" fill="#001745" fill-opacity="0.9" stroke="#44A8F4"/>
  <path d="M2 28.5V17.9279C2 17.6546 2.11186 17.3932 2.30956 17.2045L17.95 2.27661C18.136 2.09906 18.3833 2 18.6404 2H29.7648" stroke="#1EF1FF" stroke-width="4"/>
  <path d="${icon1Svg}" stroke="#1EF1FF" stroke-width="4"/>
  <path d="${icon2Svg}" fill="#1EF1FF"/>
  <path d="${icon3Svg}" fill="#1EF1FF"/>
  </svg>
  `
  console.log('yui', yui);
  const base64Code = btoa(yui);
  return `data:image/svg+xml;base64,${base64Code}`
}
