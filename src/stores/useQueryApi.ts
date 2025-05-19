import { defineStore } from 'pinia'
import type { MaybeRef } from 'vue'
import {
  useQuery,
  type QueryKey,
  type UseQueryReturnType,
} from '@tanstack/vue-query'
export const useQueryApiStore = defineStore('useQueryApi', () => {
  /**
   *
   * @param key 接口识别符->用于生成queryKey
   * @param fetchFn 接口函数
   * @param params 接口参数
   * @param enabled 是否启用
   * @returns
   */
  function useTodos<TData, TParams>(
    key: string,
    fetchFn: (params: TParams) => Promise<TData>,
    params: TParams,
    enabled: boolean = true,
  ): UseQueryReturnType<TData, unknown> {
    const queryKey: QueryKey = [key, params] // ✅ 类型断言
    return useQuery({
      queryKey,
      queryFn: () => fetchFn(params),
      staleTime: 1000 * 60 * 5, //缓存时间
      enabled,
    })
  }
  return {
    useTodos,
  }
})
