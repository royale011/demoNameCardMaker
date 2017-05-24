import Vue from 'vue'

let tick = function (callback) {
  return new Promise((resolve, reject) => {
    Vue.nextTick(() => {
      resolve()
    })
  })
}

let nextTick = function (done, times, callback) {
  let ticks = []

  for (let i = 0; i < times; i += 1) {
    ticks.push(tick)
  }
  ticks.reduce(function (cur, next) {
    return cur.then(next)
  }, Promise.resolve()).then(() => {
    try {
      callback()
      done()
    } catch (e) {
      done(e)
    }
  })
}

export default {nextTick}
