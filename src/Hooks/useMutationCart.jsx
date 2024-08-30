import { useMutation } from '@tanstack/react-query'
import React from 'react'
import {  useQueryClient } from '@tanstack/react-query'
import { clearCartApi } from '../APIS/catrAPIs'
export default function useMutationCart(fn) {
    const queryClient = useQueryClient()
 return useMutation({mutationFn:fn ,onSuccess:()=>{queryClient.invalidateQueries({ queryKey: ['getCart'] })
 
 if(fn==clearCartApi)
    queryClient.setQueriesData('getCart',null)

}})
}
