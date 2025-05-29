import request from '@/utils/request/index'

export const getSub = () => {
  return request({
    url: 'api/SubGet',
    method: 'get',
    params: 'asmr',
  })
}

export const getSubDeviceList = (data: {
  page?: number
  limit: number
}): Promise<
  ApiResponse<{
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
