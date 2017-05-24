<template>
  <div id="demo">
    <div class="container" v-show="panel">
      <div>
        <img id="image" :src="url" alt="Picture">
      </div>

    </div>

    <div class="main-div" style="">
      <div class="input-div">
        <input type="file" id="change" accept="image" @change="change">
        <label for="change"></label>
      </div>
      <div class="show"></div>

    </div>
  </div>
</template>

<script>
  import Cropper from 'cropperjs'
  export default {
    components: {

    },
    data () {
      return {
        headerImage: '',
        picValue: '',
        cropper: '',
        croppable: false,
        panel: false,
        url: '',
        image: document.getElementById('image')
      }
    },
    mounted () {
      let self = this
      this.image = document.getElementById('image')
      this.cropper = new Cropper(this.image, {
        aspectRatio: 1,
        background: false,
        zoomable: false,
        ready: function () {
          self.croppable = true
        },

        crop: function (e) {
          let elem = document.getElementsByClassName('show')[0]
          let data = e.detail
          let cropper = self.cropper
          let imageData = cropper.getImageData()
          let previewAspectRatio = data.width / data.height
          let previewImage = elem.getElementsByTagName('img').item(0)
          let previewWidth = elem.offsetWidth
          let previewHeight = previewWidth / previewAspectRatio
          let imageScaledRatio = data.width / previewWidth
          elem.style.height = previewHeight + 'px'
          previewImage.style.width = imageData.naturalWidth / imageScaledRatio + 'px'
          previewImage.style.height = imageData.naturalHeight / imageScaledRatio + 'px'
          previewImage.style.marginLeft = -data.x / imageScaledRatio + 'px'
          previewImage.style.marginTop = -data.y / imageScaledRatio + 'px'
        }
      })
    },
    methods: {
      getObjectURL (file) {
        var url = null
        if (window.createObjectURL !== undefined) { // basic
          url = window.createObjectURL(file)
        } else if (window.URL !== undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file)
        } else if (window.webkitURL !== undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file)
        }
        return url
      },
      change (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        this.panel = true
        this.picValue = files[0]

        this.url = this.getObjectURL(this.picValue)
        if (this.cropper) {
          this.cropper.replace(this.url)
        }
        let clone = this.image.cloneNode()
        clone.className = ''
        clone.style.cssText = (
          'display: block;' +
          'width: 100%;' +
          'min-width: 0;' +
          'min-height: 0;' +
          'max-width: none;' +
          'max-height: none;'
        )
        let elem = document.getElementsByClassName('show')[0]
        elem.appendChild(clone.cloneNode())
        this.panel = true
      }
    }
  }
</script>

<style>
  @import "../../public/stylesheets/NameCardMaker.scss";
  @import "../../public/stylesheets/cropperjs.scss";
</style>
