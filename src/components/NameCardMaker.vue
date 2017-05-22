<template>
  <div id="demo">
    <div class="container" v-show="panel">
      <div>
        <img id="image" :src="url" alt="Picture">
      </div>

      <button type="button" id="button" @click="crop">确定</button>

    </div>

    <div class="main-div" style="">
      <div class="show">
        <img class="picture" :src="headerImage">
      </div>
      <div class="input-div">
        <input type="file" id="change" accept="image" @change="change">
        <label for="change"></label>
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
        headerImage: '',
        picValue: '',
        cropper: '',
        croppable: false,
        panel: false,
        url: ''
      }
    },
    mounted () {
      let self = this
      let image = document.getElementById('image')
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        background: false,
        zoomable: false,
        ready: function () {
          self.croppable = true
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
        this.panel = true
      },
      crop () {
        this.panel = false
        var croppedCanvas
        if (!this.croppable) {
          return
        }
        croppedCanvas = this.cropper.getCroppedCanvas()
        this.headerImage = croppedCanvas.toDataURL()
      }
    }
  }
</script>

<style>
  @import "../../public/stylesheets/NameCardMaker.scss";
  @import "../../public/stylesheets/cropperjs.scss";
</style>
