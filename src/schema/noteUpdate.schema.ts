import {z} from "zod"

export const noteUpdateSchema=z.object({
    title:z.string().min(5).optional(),
    content:z.string().min(5).optional(),
    trashed:z.boolean().optional(),
    publicId:z.string().optional(),
    isShared: z.boolean().optional(),
})

export type TUpdateNoteInput= z.infer<typeof noteUpdateSchema>