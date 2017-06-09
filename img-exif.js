'use strict'

/* global EXIF:false */

;(function (ownerDocument) {
  class ImageExif extends HTMLElement {
    constructor () {
      super()

      this._debug = false
      this.debug('constructing')

      this.root = this.attachShadow({mode: 'open'})

      const template = ownerDocument.querySelector('template')
      this.root.appendChild(document.importNode(template.content, true))
    }

    connectedCallback () {
      this.debug('connected img-exif')

      // this.render()
    }

    render () {
      if (this.src && !this.isConnected) return
      this.debug('rendering img-exif')

      const $target = this.root.querySelector('canvas, img')
      if ($target) this.root.removeChild($target)

      this.$canvas = document.createElement('canvas')
      this.$img = document.createElement('img')

      const self = this
      const $img = this.$img
      const $canvas = this.$canvas

      const ctx = $canvas.getContext('2d')

      // parse image for orientation
      EXIF.getData({ src: this.src }, function (buffer) {
        self.debug('got EXIF data', self.src)

        // get orientation
        const orientation = EXIF.getTag(this, 'Orientation')
        self.debug(`orientation code: ${orientation}`)

        // set image src to blob
        $img.src = URL.createObjectURL(new Blob([buffer]))

        const transformRequired = orientation && orientation !== 1
        const $target = transformRequired ? $canvas : $img

        $img.onload = () => {
          self.debug('blob image loaded')

          // if orientation adjustment is needed
          if (transformRequired) {
            // if image dimensions have changed
            if ([5, 6, 7, 8].includes(orientation)) {
              $canvas.width = $img.height
              $canvas.height = $img.width
            } else {
              $canvas.width = $img.width
              $canvas.height = $img.height
            }

            // possible orientation effects
            const orientations = {
              // 1: () => ctx.transform(1, 0, 0, 1, 0, 0),
              2: () => ctx.transform(-1, 0, 0, 1, $img.width, 0),
              3: () => ctx.transform(-1, 0, 0, -1, $img.width, $img.height),
              4: () => ctx.transform(1, 0, 0, -1, 0, $img.height),
              5: () => ctx.transform(0, 1, 1, 0, 0, 0),
              6: () => ctx.transform(0, 1, -1, 0, $img.height, 0),
              7: () => ctx.transform(0, -1, -1, 0, $img.height, $img.width),
              8: () => ctx.transform(0, -1, 1, 0, 0, $img.width)
            }

            // apply orientation to canvas
            orientations[orientation]()

            // draw image to canvas
            ctx.drawImage($img, 0, 0)
          }

          // insert canvas or img
          self.root.appendChild($target)
        }
      })
    }

    get blobUrl () {
      return new Promise((resolve, reject) => {
        this.$canvas.toBlob(function (blob) {
          resolve(URL.createObjectURL(blob))
        })
      })
    }

    get src () {
      return this.getAttribute('src')
    }

    set src (val) {
      return this.setAttribute('src', val)
    }

    get alt () {
      return this.hasAttribute('alt') ? this.getAttribute('alt') : null
    }

    set alt (val) {
      return this.setAttribute('alt', val)
    }

    disconnectedCallback () {
      this.debug('disconnection img-exif')
    }

    adoptedCallback () {
      this.debug('adopted img-exif')
    }

    static get observedAttributes () {
      return ['src', 'alt']
    }

    attributeChangedCallback (attrName, oldVal, newVal) {
      this.debug(`attribute changed on img-exif: ${attrName}, ${oldVal} => ${newVal}`)

      const changes = {
        src: () => { if (oldVal !== newVal) this.render() },
        alt: () => { if (oldVal !== newVal) this.render() }
      }

      if (attrName in changes) changes[attrName]()
    }

    debug (msg) {
      if (this._debug) console.info(msg)
    }
  }

  window.customElements.define('img-exif', ImageExif)
})(document.currentScript.ownerDocument)
