import { loadingKaspi, kaspiPay, router } from './KaspiModal.vue'

export function handlKaspiBtn() {
  loadingKaspi.value = true
  setTimeout(() => {
    loadingKaspi.value = false
    kaspiPay.value = true
    router.push(`/pay/${data.id}`)
  }, 1000)
}
