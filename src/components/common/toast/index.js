import Toast from "./Toast";

const toast = {}

toast.install = function (Vue){
  const toastContrustor = Vue.extend(Toast)

  const toastObj = new toastContrustor()

  toastObj.$mount(document.createElement('div'))

  document.body.appendChild(toastObj.$el)

  Vue.prototype.$toast = toastObj
}

export default toast
