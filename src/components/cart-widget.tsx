'use client'

import { useContext } from 'react'
import { CartContext } from '@/contexts/cart-context'

import { ShoppingBag } from 'lucide-react'

export default function CartWidget() {
    const { cartItems } = useContext(CartContext)
    
    return (
        <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="text-sm">
                Cart ({cartItems.length})
            </span>
        </div>
    )
}