/**
 * @Function
 * @date 2021-02-13
 * @param {string} media:string
 * @param {string} identifier:string
 * @returns {promise}
 */

export default function loadMedia(media:string, identifier:string) {
  if (identifier === 'a'){
    return new Promise((res,rej) => {
      const aud = new Audio()
      aud.src = media
      aud.oncanplaythrough = () => res(aud)
      aud.onerror = (err) => rej(err)
    })
  } else if (identifier === 'i') {
    return new Promise((res,rej) => {
      const img = new Image()
      img.src = media
      img.onload = () => res(img)
      img.onerror = (err) => rej(err)
    })
  } else {
    return
  }
}