import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import CartWidget from './cart-widget'
import SearchForm from './search-form'

export default function Header() {
    return (
        <header className="
            flex items-center justify-between">
            <nav className="flex items-center gap-5">
                <Link
                    href="/"
                    className="text-2xl font-extrabold text-white">
                    devstore
                </Link>

                <Suspense fallback={null}>
                    <SearchForm />
                </Suspense>
            </nav>

            <nav className="flex items-center gap-4">
                <CartWidget />

                <div className="w-px h-4 bg-zinc-700" />

                <Link
                    href="/"
                    className="flex items-center gap-2 hover:underline">
                    <span className="text-sm">
                        Account
                    </span>
                    <Image
                        src="https://github.com/luca-merighi.png" alt="Foto de Perfil"
                        width={24} height={24}
                        className="h-6 w-6 rounded-full" />
                </Link>
            </nav>
        </header>
    )
}