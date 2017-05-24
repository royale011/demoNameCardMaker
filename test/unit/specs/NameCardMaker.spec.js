import Vue from 'vue'
import Utils from './Utils'
import NameCardMaker from '@/components/NameCardMaker'

describe('NameCardMaker.vue', (done) => {
  it('should show name in card when input name', () => {
    const Constructor = Vue.extend(NameCardMaker)
    const vm = new Constructor().$mount()
    vm.$el.querySelector('#name-input').value = 'name'
    Utils.nextTick(done, 1, function () {
      expect(vm.$el.querySelector('#name').textContent)
        .to.equal('name')
    })
  })
  it('should show email in card when input email', () => {
    const Constructor = Vue.extend(NameCardMaker)
    const vm = new Constructor().$mount()
    vm.$el.querySelector('#email-input').value = 'test@example.com'
    Utils.nextTick(done, 1, function () {
      expect(vm.$el.querySelector('#email').textContent)
        .to.equal('test@example.com')
    })
  })
})
