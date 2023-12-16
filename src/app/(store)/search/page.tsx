import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Product } from '@/data/types/product'
import { api } from '@/data/api'

interface SearchProps {
    searchParams: {
        q: string
    }
}

async function searchProducts(query: string): Promise<Product[]> {
    const response = await api(`/products/search?q=${query}`, {
        next: {
            revalidate: 60 * 60 // 1 hour
        },
        // cache: 'no-store'
    })
    const products = await response.json()
    
    return products
}

export default async function Search({ searchParams }: SearchProps) {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    const { q: query } = searchParams
    
    if(!query) {
        redirect('/')
    }
    
    const products = await searchProducts(query)
    
    return (
        <div className="
            flex flex-col gap-4">
            <p className="text-sm">
                Resultados para: <span className="font-semibold">{query}</span>
            </p>
            
            <div className="grid grid-cols-3 gap-6">
                {products.map(product => {
                    return (
                        <Link 
                            key={product.id}
                            href={`/product/${product.slug}`}
                            className="
                            group relative overflow-hidden
                            bg-zinc-900 rounded-lg">
                            <Image 
                            src={product.image} alt={product.title}
                            width={480} height={480} quality={100}
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
        </div>
    )
}