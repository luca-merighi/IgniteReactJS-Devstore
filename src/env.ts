import { createEnv } from '@t3-oss/env-nextjs'
import * as zod from 'zod'

export const env = createEnv({
    server: {
        APP_URL: zod.string().url()
    },
    client: {
        NEXT_PUBLIC_API_BASE_URL: zod.string().url()
    },
    runtimeEnv: {
        APP_URL: process.env.APP_URL,
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    }
})