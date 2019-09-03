import { axios } from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  product: '/product',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree',
  deleteOne: '/deleteOne',
  addOne: '/addOne',
  modifyProduct: '/modifyProduct'
}

export default api

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
  return axios({
    url: api.product,
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
