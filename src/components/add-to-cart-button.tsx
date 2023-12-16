'use client'

import { useContext } from 'react'
import { CartContext } from '@/contexts/cart-context'

interface AddToCartButtonProps {
    productId: number
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
    const { addToCart } = useContext(CartContext)
    
    function handleAddProductToCart() {
        addToCart(productId)
    }
    
    return (
        <button 
            type="button" 
            onClick={handleAddProductToCart}
            className="
            mt-8 h-12 flex items-center justify-center 
            bg-emerald-600 font-semibold text-white rounded-full">
            Adicionar ao Carrinho
        </button>
    )
}