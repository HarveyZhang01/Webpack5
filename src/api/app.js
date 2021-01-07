export const getAppName = () => {
  return new Promise((resolve, reject)=> {
    const err = null
    setTimeout(() => {
      if (!err) resolve({code: 200, data: { app: 'MyApp' }})
      else reject(err)
    }, 4000)
  })
}