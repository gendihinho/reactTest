import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function useQueryWishlist(key,fn) {
  return useQuery({queryKey:[key],queryFn:fn})
}
