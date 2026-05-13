import {z} from 'zod'

export const querySchema = z.object({
    query:z.string().min(6).max(90)
})