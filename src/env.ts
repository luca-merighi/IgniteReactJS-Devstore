import * as zod from 'zod'

const envSchema = zod.object({
    NEXT_PUBLIC_API_BASE_URL: zod.string().url(),
    APP_URL: zod.string().url(),
})

const parsedEnv = envSchema.safeParse(process.env)

if(!parsedEnv.success) {
    console.error('Invalid environment variables', 
    parsedEnv.error.flatten().fieldErrors)
    
    throw new Error('Invalid environment variables')
} 

export const env = parsedEnv.data