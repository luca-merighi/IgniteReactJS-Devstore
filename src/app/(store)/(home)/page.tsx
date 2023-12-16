import Link from 'next/link'
import Image from 'next/image'

import { Product } from '@/data/types/product'
import { api } from '@/data/api'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Home'
}

async function getFeaturedProducts(): Promise<Product[]> {
    const response = await api('/products/featured', {
        next: {
            revalidate: 60 * 60 // 1 hour
        },
        // cache: 'no-store'
    })
    const products = await response.json()
    
    return products
}

export default async function Home() {
    const [ highlightedProduct, ...otherProducts ] = await getFeaturedProducts()
    
    return (
        <div className="
            max-h-[780px] grid grid-cols-9 grid-rows-6 gap-6">
            <Link 
                href={`/product/${highlightedProduct.slug}`}
                className="
                group relative overflow-hidden col-span-6 row-span-6
                bg-zinc-900 rounded-lg">
                <Image 
                src={highlightedProduct.image} alt={highlightedProduct.title}
                width={860} height={860} quality={100}
                className="group-hover:scale-105 transition-transform duration-500" />
                <div className="
                absolute bottom-28 right-28 h-12 flex items-center gap-2
                bg-black/60 p-1 pl-5 max-w-[280px] 
                rounded-full border-2 border-zinc-500">
                    <span className="text-sm truncate">
                        {highlightedProduct.title}
                    </span>
                    <span className="
                    flex items-center justify-center
                    h-full px-5 bg-violet-500 font-semibold
                    rounded-full">
                        {highlightedProduct.price.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        })}
                    </span>
                </div>
            </Link>
            
            {otherProducts.map(product => {
                return (
                    <Link 
                        key={product.id}
                        href={`product/${product.slug}`}
                        className="
                        group relative overflow-hidden col-span-3 row-span-3
                        bg-zinc-900 rounded-lg">
                        <Image 
                        src={product.image} alt={product.title}
                        width={860} height={860} quality={100}
                        className="group-hover:scale-105 transition-transform duration-500" />
                        <div className="
                        absolute bottom-10 right-10 h-12 flex items-center gap-2
                        bg-black/60 p-1 pl-5 max-w-[280px] 
                        rounded-full border-2 border-zinc-500">
                            <span className="text-sm truncate">
                                {product.title}
                            </span>
                            <span className="
                            flex items-center justify-center
                            h-full px-5 bg-violet-500 font-semibold
                            rounded-full">
                                {product.price.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                })}
                            </span>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}