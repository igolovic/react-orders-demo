import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import type {PagedOrderDto} from '../types'
import {fetchOrders as apiFetchOrders, saveOrder as apiSaveOrder, deleteOrder as apiDeleteOrder} from '../api/orders'

type PagedOrders = { orders: PagedOrderDto[], totalCount: number };

export function useFetchOrders(filter: string, pageIndex: number) {
  return useQuery<PagedOrders, Error>({
    queryKey: ['fetchOrders', filter, pageIndex],
    queryFn: async () => {
      const data = await apiFetchOrders(filter, pageIndex)
      return data as PagedOrders
    },
    staleTime: 1000 * 60, // 1min
  })
}

export function useSaveOrder() {
    const qc = useQueryClient();
    return useMutation<PagedOrderDto, Error, { order: PagedOrderDto, isNew: boolean }, unknown>({
        mutationFn: async (payload: { order: PagedOrderDto, isNew: boolean }): Promise<PagedOrderDto> => {
            return await apiSaveOrder(payload.order, payload.isNew)
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: ['fetchOrders'] })
    });
}

export function useDeleteOrder() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (orderId: number) => await apiDeleteOrder(orderId),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['fetchOrders'] })
    });
}