import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { deletewishlistApi } from '../APIS/wishListAPIs'

export default function useMutationWishlist(fn) {
    const queryClient = useQueryClient()
  return useMutation({mutationFn:fn,onSuccess:()=>{queryClient.invalidateQueries({ queryKey: ['getwishlist'] })
 
}})
}
