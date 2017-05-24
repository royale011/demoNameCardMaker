import Vue from 'vue'
import Utils from './Utils'
import NameCardMaker from '@/components/NameCardMaker'

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
})
