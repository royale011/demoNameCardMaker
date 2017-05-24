<template>
  <div id="demo">
    <h1>Get Your Name Card by Two Step!</h1>
    <div class="name-card-div">
      <div class="result-div">
        <div class="cropped-image-div"></div>
        <table>
          <tr>
            <td>Name</td>
            <td>{{name}}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{{email}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div>
      <h2>Step 1: Fill Your Basic Info</h2>
      <p>Your Name:</p>
      <label for="name-input"></label><input id="name-input" type="text" v-model="name" :placeholder="'Input your name here'">
      <p>Your Email Address:</p>
      <label for="name-input"></label><input id="email-input" type="text" v-model="email" :placeholder="'Input your email here'">
  </div>
    <div>
      <h2>Step 2: Choose Your Avatar</h2>
      <div class="choose-file-div">
        <input type="file" id="change" accept="image" @change="change">
        <label for="change"></label>
      </div>
      <div class="image-cropper-container" v-show="panel">
        <div>
          <img id="image" :src="imageUrl" alt="Picture">
        </div>
      </div>
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
        picValue: '',
        cropper: '',
        panel: false,
        imageUrl: '',
        name: '',
        email: ''
      }
    },
    mounted () {
      let self = this
      let image = document.getElementById('image')
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        background: false,
        zoomable: false,
        crop: function (e) {
          let elem = document.getElementsByClassName('cropped-image-div')[0]
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
        let url = null
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
        this.picValue = files[0]

        this.imageUrl = this.getObjectURL(this.picValue)
        if (this.cropper) {
          this.cropper.replace(this.imageUrl)
        }
        let image = document.getElementById('image')
        let clone = image.cloneNode()
        clone.className = ''
        clone.style.cssText = (
          'display: block;' +
          'width: 100%;' +
          'min-width: 0;' +
          'min-height: 0;' +
          'max-width: none;' +
          'max-height: none;'
        )
        let elem = document.getElementsByClassName('cropped-image-div')[0]
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
