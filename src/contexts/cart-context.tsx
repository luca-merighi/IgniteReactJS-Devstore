'use client'

import { ReactNode, createContext, useState } from 'react'

interface CartItem {
    productId: number,
    quantity: number
}

interface CartContextData {
    cartItems: CartItem[],
    addToCart: (productId: number) => void
}

interface CartProviderProps {
    children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

export default function CartProvider(props: CartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    
    function addToCart(productId: number) {
        setCartItems(state => {
            const productInCart = state.some(
                item => item.productId === productId)
                
            if(productInCart) {
                return state.map(item => {
                    if(item.productId === productId) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    } else {
                        return item
                    }
                })
            } else {
                return [...state, {
                    productId,
                    quantity: 1
                }]
            }
        })
    }
    
    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart
        }}>
            {props.children}
        </CartContext.Provider>
    )
}