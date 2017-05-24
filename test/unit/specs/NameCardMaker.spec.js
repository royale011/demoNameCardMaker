import Vue from 'vue'
import Utils from './Utils'
import NameCardMaker from '@/components/NameCardMaker'
import Cropper from 'cropperjs'

function createCropper(vm) {
  vm.cropper = new Cropper(vm.$el.querySelector('#image'), {
    aspectRatio: 1,
    background: false,
    zoomable: false,
    crop: function (e) {
      let elem = document.querySelector('.cropped-image-div')
      let data = e.detail
      let cropper = vm.cropper
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
}

describe('NameCardMaker.vue', () => {
  it('should have empty info when mounted', () => {
    const Constructor = Vue.extend(NameCardMaker)
    const vm = new Constructor().$mount()
    expect(vm.picValue).to.equal('')
    expect(vm.cropper).to.equal('')
    expect(vm.panel).to.equal(false)
    expect(vm.imageUrl).to.equal('')
    expect(vm.name).to.equal('')
    expect(vm.email).to.equal('')
    expect(vm.wechat).to.equal('')
  })
  it('should show name in card when input name', (done) => {
    const Constructor = Vue.extend(NameCardMaker)
    const vm = new Constructor().$mount()
    vm.name = 'name'
    Utils.nextTick(done, 1, function () {
      expect(vm.$el.querySelector('#name').textContent)
        .to.equal('name')
    })
  })
  it('should show email in card when input email', (done) => {
    const Constructor = Vue.extend(NameCardMaker)
    const vm = new Constructor().$mount()
    vm.email = 'test@example.com'
    Utils.nextTick(done, 1, function () {
      expect(vm.$el.querySelector('#email').textContent)
        .to.equal('test@example.com')
    })
  })
  it('should show wechat in card when input wechat', (done) => {
    const Constructor = Vue.extend(NameCardMaker)
    const vm = new Constructor().$mount()
    vm.wechat = 'wechat'
    Utils.nextTick(done, 1, function () {
      expect(vm.$el.querySelector('#wechat').textContent)
        .to.equal('wechat')
    })
  })
  it('should change cropper status when add image', (done) => {
    const Constructor = Vue.extend(NameCardMaker)
    const vm = new Constructor().$mount()
    Utils.nextTick(done, 1, function () { // we need to create cropper again as in unit test, document elements have not generated until next tick
      createCropper(vm);
      vm.picValue = {name: 'name', type: 'image/jpeg'}
      Utils.nextTick(done, 1, function () {
        console.log(vm.$el.querySelector('.cropped-image-div'))
        expect(vm.$el.querySelector('.cropped-image-div').childNodes.length).to.equal(1)
        expect(vm.$el.querySelector('.cropped-image-div img').style.cssText).to.equal((
          'display: block;' +
          'width: 100%;' +
          'min-width: 0;' +
          'min-height: 0;' +
          'max-width: none;' +
          'max-height: none;'
        ))
      })
    })
  })
})
