<template>
  <div class="hello">
    <div>
      <img class="image-crop" :src="img">
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      img: ''
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
      this.img = 'static/images/logo.png'
      console.log('MOUNTED')
    },
    cropper () {
      return new this.Cropper(document.querySelector('.image-crop'), {
        aspectRatio: 1,
        ready: function () {
          this.cropper.crop()
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="scss">
  .image-crop {
    max-width: 100%; /* This rule is very important, please do not ignore this! */
  }
</style>
