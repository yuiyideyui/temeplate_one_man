import request from "@/utils/request/index";

export const getSub = ()=>{
  return request({
    url:'api/SubGet',
    method:'get',
    params:'asmr',
  })
}
