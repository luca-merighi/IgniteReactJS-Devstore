import Image from 'next/image'
import { Product } from '@/data/types/product'
import { api } from '@/data/api'
import { Metadata } from 'next'
import AddToCartButton from '@/components/add-to-cart-button'

async function getProduct(slug: string): Promise<Product> {
    const response = await api(`/products/${slug}`, {
        next: {
            revalidate: 60 * 60 // 1 hour
        },
        // cache: 'no-store'
    })
    const product = await response.json()
    
    return product
}

interface ProductPageProps {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const product = await getProduct(params.slug)
    
    return {
        title: product.title
    }
}

export async function generateStaticParams() {
    const response = await api('/products/featured')
    const products: Product[] = await response.json()
    
    return products.map(product => {
        return { slug: product.slug }
    })
}

export default async function ProductPage({ params }: ProductPageProps) {
    const product = await getProduct(params.slug)
    
    return (
        <div className="
            relative max-h-[780px] grid grid-cols-3 bg-zinc-900">
            <div className="
                overflow-hidden col-span-2">
                <Image
                    src={product.image} alt={product.title}
                    width={1000} height={1000} quality={100}
                    className="relative" />
            </div>
            
            <div className="
                flex flex-col justify-center px-12">
                <h1 className="text-3xl font-bold leading-tight">
                    {product.title}
                </h1>
                
                <p className="mt-2 leading-relaxed text-zinc-400">
                    {product.description}
                </p>
                
                <div className="
                    mt-8 flex items-center gap-3">
                    <span className="
                        bg-violet-500 inline-block px-5 py-2.5 
                        font-semibold rounded-full">
                        {product.price.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        })}
                    </span>
                    <span className="text-sm text-zinc-400">
                        Em até 12x s/ juros de {(product.price / 12).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })}
                    </span>
                </div>
                
                <div className="mt-8 space-y-4">
                    <span className="block font-semibold">
                        Tamanhos
                    </span>
                    
                    <div className="flex gap-2">
                        <button 
                            type="button" 
                            className="
                            h-9 w-14 flex items-center justify-center bg-zinc-800
                            text-sm font-semibold
                            border border-zinc-700 rounded-full">
                            P
                        </button>
                        <button 
                            type="button" 
                            className="
                            h-9 w-14 flex items-center justify-center bg-zinc-800
                            text-sm font-semibold
                            border border-zinc-700 rounded-full">
                            M
                        </button>
                        <button 
                            type="button" 
                            className="
                            h-9 w-14 flex items-center justify-center bg-zinc-800
                            text-sm font-semibold
                            border border-zinc-700 rounded-full">
                            G
                        </button>
                        <button 
                            type="button" 
                            className="
                            h-9 w-14 flex items-center justify-center bg-zinc-800
                            text-sm font-semibold
                            border border-zinc-700 rounded-full">
                            GG
                        </button>
                    </div>
                </div>
                
                <AddToCartButton productId={product.id} />
            </div>
        </div>
    )
}