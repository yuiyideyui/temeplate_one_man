import request from '@/utils/request/index'
import { get } from '@/utils/request/index'

export const getSub = () => {
  // return request({
  //   url: 'api/SubGet',
  //   method: 'get',
  //   params: 'asmr',
  // })
  return get<
    Api.Response<{
      yui: string
    }>
  >('api/SubGet', {
    asmr: 'asmr',
  })
}

export const getSubDeviceList = (data: {
  page?: number
  limit: number
}): Promise<
  Api.Response<{
    count: number
    rows: any[]
  }>
> => {
  // return new Promise((resolve)=>{
  //   resolve()
  // })
  return request({
    url: '/security/securityCtr/subDeviceList',
    method: 'post',
    data,
  })
}
