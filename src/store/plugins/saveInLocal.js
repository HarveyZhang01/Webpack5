 // 插件
export default store => {
  console.log('store初始化了');
  if (localStorage.state) store.replaceState(JSON.parse(localStorage.state))
  store.subscribe((mutation, state) => {
    // 
    console.log('提交了mutation');
    // 持久化出巡
    localStorage.state = JSON.stringify(state)
  })
}