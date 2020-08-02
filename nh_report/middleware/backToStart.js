export default function({ store, redirect }) {
  if(store.getters['jusoModule/jusoResLength'] == 0) redirect('/')
}