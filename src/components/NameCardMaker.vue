<template>
  <div id="demo">
    <div>
      <h1>Get Your Name Card by Two Step!</h1>
      <div class="name-card-div">
        <div class="result-div">
          <div class="cropped-image-div"></div>
          <table>
            <tr>
              <td class="name-card-title">Name</td>
              <td id="name">{{name}}</td>
            </tr>
            <tr>
              <td class="name-card-title">Email</td>
              <td id="email">{{email}}</td>
            </tr>
            <tr>
              <td class="name-card-title">WeChat</td>
              <td id="wechat">{{wechat}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="input-div">
      <h2>Step 1: Fill Your Basic Info</h2>
      <div class="basic-info-div-wrapper">
        <div class="basic-info-div">
          <p>Your Name:</p>
          <label for="name-input"></label><input id="name-input" type="text" v-model="name" :placeholder="'Input your name here'">
          <p>Your Email Address:</p>
          <label for="email-input"></label><input id="email-input" type="text" v-model="email" :placeholder="'Input your email here'">
          <p>Your WeChat:</p>
          <label for="wechat-input"></label><input id="wechat-input" type="text" v-model="wechat" :placeholder="'Input your email here'">
        </div>
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
        email: '',
        wechat: ''
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
          let imageScaledRatioWidth = data.width / previewWidth
          let imageScaledRatioHeight = data.height / previewHeight
          elem.style.height = previewHeight + 'px'
          previewImage.style.width = imageData.naturalWidth / imageScaledRatioWidth + 'px'
          previewImage.style.height = imageData.naturalHeight / imageScaledRatioHeight + 'px'
          previewImage.style.marginLeft = -data.x / imageScaledRatioWidth + 'px'
          previewImage.style.marginTop = -data.y / imageScaledRatioHeight + 'px'
          previewImage.style.marginRight = -(data.x + data.width) / imageScaledRatioWidth + 'px'
          previewImage.style.marginBottom = -(data.y + data.height) / imageScaledRatioHeight + 'px'
        }
      })
    },
    watch: {
      picValue: function () {
        this.imageUrl = this.getObjectURL(this.picValue)
        if (this.cropper) {
          this.cropper.replace(this.imageUrl)
        }
        this.setImageToPreview()
      }
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
        this.panel = true
      },
      setImageToPreview: function () {
        let image = document.getElementById('image')
        let clone = image.cloneNode()
        clone.src = this.imageUrl
        clone.className = ''
        clone.style.display = 'block'
        clone.style.width = '100%'
        clone.style.minWidth = '0'
        clone.style.minHeight = '0'
        clone.style.maxWidth = 'none'
        clone.style.maxHeight = 'none'
        let elem = document.getElementsByClassName('cropped-image-div')[0]
        let childList = elem.childNodes
        if (childList.length > 0) {
          for (let i = 1; i < childList.length; i++) {
            elem.removeChild(childList[i])
          }
          elem.replaceChild(clone, childList[0])
        } else {
          elem.appendChild(clone)
        }
      }
    }
  }
</script>

<style>
  @import "../../public/stylesheets/NameCardMaker.scss";
  @import "../../public/stylesheets/cropperjs.scss";
</style>
