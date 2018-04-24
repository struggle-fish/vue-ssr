export default {
  updateCount (state, { num, num2 }) {
    console.log(num, '+++')
    state.count = num
  }
}
