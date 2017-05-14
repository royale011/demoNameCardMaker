<template>
  <div id="app">
    <h2>Vue CropperJS</h2>
    <hr/>
    <input type="file" name="image" accept="image/*" @change="this.setImage"/>
    <br/>
    <div class="cropper">
      <img :src="imgSrc" class="img-src"/>
    </div>
    <img :src="cropImg" class="cropped"/>
  </div>
</template>

<script>
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
    mount () {
      this.$el.querySelector('.img-src').cropper({
        aspectRatio: 1,
        crop: function (e) {
          this.cropImg = this.getCroppedCanvas().toDataURL()
        }

      })
    },
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
          this.cropImg = event.target.result
        }
        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    }
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
  .cropper {
    max-width: 900px;
    display: inline-block;
    .img-src {
      width: 400px;
      height: 300px;
    }
  }
  .cropped {
    width: 200px;
    height: 150px;
    border: 1px solid gray;
  }
</style>
