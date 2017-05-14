<template>
  <div id="app">
    <h2>Vue CropperJS</h2>
    <hr/>
    <input type="file" name="image" accept="image/*" @change="this.setImage"/>
    <br/>
    <div>
      <VueCropper></VueCropper>
    </div>
    <img :src="cropImg" alt="Cropped Image"/>
    <br/>
    <button v-show="!!imgSrc" @click="this.rotate">Rotate</button>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs'
export default {
  name: 'hello',
  data () {
    return {
      imgSrc: '',
      cropImg: ''
    }
  },
  watch: {
    img: function () {
      return this.cropper()
    }
  },
  mounted: function () {
    this.mount()
  },
  methods: {
    setImage (e) {
      const file = e.target.files[0]
      if (!file.type.includes('image/')) {
        alert('Please select an image file')
        return
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader()
        reader.onload = (event) => {
          this.imgSrc = event.target.result
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result)
        }
        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
    cropImage () {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
    },
    rotate () {
      // guess what this does :)
      this.$refs.cropper.rotate(90)
    }
  },
  components: {
    VueCropper
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="scss">
  h2 {
    margin: 0;
  }
  input {
    font-size: 1.2em;
    padding: 10px 0;
  }
  div {
    max-width: 900px;
    display: inline-block;
  }
  img {
    width: 200px;
    height: 150px;
    border: 1px solid gray;
  }
</style>
