function setScale(
  viewportWidth = 1920,
  viewportHeight = 1080,
  domName: string = '.mainBox-container',
) {
  const dom: any = document.querySelectorAll(domName)[0]
  // console.log('dom :>> ', document.querySelectorAll('.main'));
  if (!dom) return
  const childElement = dom.querySelector('.cimBox')
  // console.log('childElement :>> ', childElement);
  dom.style['transform-origin'] = 'top left'
  dom.style['-ms-transform-origin'] = 'top left'
  dom.style['-webkit-transform-origin'] = 'top left'
  if (childElement) {
    childElement.style['transform-origin'] = 'top left'
    childElement.style['-ms-transform-origin'] = 'top left'
    childElement.style['-webkit-transform-origin'] = 'top left'
  }

  let s: any = null
  let h: any = null

  if (window.innerWidth / window.innerHeight > 2) {
    // console.log('window.innerWidth / window.innerHeight', window.innerWidth / window.innerHeight);
    s =
      window.innerWidth /
      ((viewportHeight * window.innerWidth) / window.innerHeight)
    h = window.innerHeight / viewportHeight
    dom.style['transform'] = ` scale(${s},${h})`
    dom.style['-ms-transform'] = ` scale(${s},${h})`
    dom.style['-webkit-transform'] = ` scale(${s},${h})`
    dom.style.width = window.innerWidth / s + 'px'
    dom.style.height = window.innerHeight / h + 'px'
    if (childElement) childElement.style.transform = `scale(${1 / s},${1 / h})`
  } else if (window.innerWidth / window.innerHeight <= 2) {
    s = window.innerWidth / viewportWidth
    h = window.innerHeight / viewportHeight
    dom.style['transform'] = ` scale(${s},${h})`
    dom.style['-ms-transform'] = ` scale(${s},${h})`
    dom.style['-webkit-transform'] = ` scale(${s},${h})`
    dom.style.width = window.innerWidth / s + 'px'
    dom.style.height = window.innerHeight / h + 'px'
    if (childElement) childElement.style.transform = `scale(${1 / s},${1 / h})`
  }
  window.s = s
  window.h = h
}

window.setScale = setScale
window.addEventListener('resize', () => {
  setScale()
})
setTimeout(() => {
  setScale()
})
