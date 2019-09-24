import { axios } from '@/utils/request'

const BASE_URL = 'http://47.111.67.221:10000/APSSServer'
const api = {
  farm: BASE_URL + '/api/FarmInfor/List/total/Paginated',
  farmTotal: BASE_URL + '/api/FarmInfor/Homepage/total',
  farmAdd: BASE_URL + '/api/FarmInfor',
  farmReview: BASE_URL + '/api/FarmInfor/Review',
  productReview: BASE_URL + '/api/AgriculturalProduct/Review',
  farmDelete: BASE_URL + '/api/FarmInfor',
  productDelete: BASE_URL + '/api/AgriculturalProduct/BatchDel',
  getProductList: BASE_URL + '/api/AgriculturalProduct/',
  getFarmDetail: BASE_URL + '/api/FarmInfor/',
  wxSurvey: BASE_URL + '/api/WeChatSurvey',
  user: '/user',
  role: '/role',
  service: '/service',
  productTotal: BASE_URL + '/api/AgriculturalProduct/ByFarmInforId/total',
  product: BASE_URL + '/api/AgriculturalProduct/ByFarmInforId/',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree',
  deleteOne: '/deleteOne',
  addOne: '/addOne',
  modifyProduct: '/modifyProduct'
}

export default api

export function getFarmList (parameter) {
  return axios({
    url: api.farm,
    method: 'get',
    params: parameter
  })
}
export function getFarmTotal (parameter) {
  return axios({
    url: api.farmTotal,
    method: 'get',
    params: parameter
  })
}
export function farmAdd (params) {
  return axios({
    url: api.farmAdd,
    method: 'post',
    data: params
  })
}
export function FarmReview (params) {
  return axios({
    url: api.farmReview,
    method: 'put',
    data: params
  })
}
export function deletFarm (parameter) {
  console.log(parameter)
  return axios({
    url: api.farmDelete,
    method: 'delete',
    params: parameter
  })
}
export function deleteProduct (params) {
  return axios({
    url: api.productDelete,
    method: 'delete',
    data: params
  })
}
export function productReview (params) {
  return axios({
    url: api.productReview,
    method: 'put',
    data: params
  })
}
export function wxSurvey (parameter) {
  return axios({
    url: api.wxSurvey,
    method: 'get',
    params: parameter
  })
}
export function getFarmDetail (parameter) {
  var Url = api.getFarmDetail + parameter
  return axios({
    url: Url,
    method: 'get'
  })
}
export function getUserList (parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function deleteOne (parameter) {
  return axios({
    url: api.deleteOne,
    method: 'get',
    params: parameter
  })
}

export function addOne (params) {
  return axios({
    url: api.addOne,
    method: 'post',
    data: params
  })
}

export function modifyProduct (params) {
  return axios({
    url: api.modifyProduct,
    method: 'post',
    data: params
  })
}
export function getRoleList (parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList (parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getProductList (parameter) {
  console.log(parameter)
  return axios({
    url: api.product + parameter.id,
    method: 'get'
  })
}
export function getProductDetailById (parameter) {
  console.log(parameter)
  var Url = api.getProductList + parameter
  return axios({
    url: Url,
    method: 'get'
  })
}
export function get (parameter) {
  console.log(parameter)
  return axios({
    url: api.product + parameter.id,
    method: 'get'
  })
}
export function getProductTotal (parameter) {
  return axios({
    url: api.productTotal,
    method: 'get',
    params: parameter
  })
}
export function getPermissions (parameter) {
  return axios({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

export function getOrgTree (parameter) {
  return axios({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService (parameter) {
  return axios({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}
