'use client'

import { FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Search } from 'lucide-react'

export default function SearchForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const query = searchParams.get('q')
    
    function handleSearch(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
    
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData)
        const query = data.q
        
        if(!query) {
            return null
        } 
        
        router.push(`/search?q=${query}`)
    }
    
    return (
        <form 
            onSubmit={handleSearch}
            className="
            w-[320px] flex items-center gap-3 bg-zinc-900
            px-5 py-3 ring-zinc-700 rounded-full">
            <Search className="w-5 h-5 text-zinc-500" />
            
            <input 
                name="q"
                defaultValue={query ?? ''}
                required
                type="text" 
                placeholder="Buscar produto..."
                className="
                    flex-1 bg-transparent text-sm 
                    placeholder:text-zinc-500 outline-none" />
        </form>
    )
}