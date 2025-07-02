import {z} from "zod"

export const noteCreateSchema=z.object({
    title:z.string().min(5),
    content:z.string().min(5),
    trashed:z.boolean().optional(),
    publicId:z.string().optional(),
    isShared: z.boolean().optional(),
})

export type TCreateNoteInput= z.infer<typeof noteCreateSchema>