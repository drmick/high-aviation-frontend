// import ApiClient from 'clearing_house/api/js/client'
//
// export default function (store, nuxtError) {
//   return new ApiClient(
//     'https://api.bittobe.com',
//     () => {
//       return {
//         'X-Iz-Service-Token': store.state.service.token,
//         'Accept-Language': store.state.app.locale
//       }
//     },
//     (error) => {
//       nuxtError({ statusCode: error.response.status })
//       return Promise.reject(error)
//     }
//   )
// }
