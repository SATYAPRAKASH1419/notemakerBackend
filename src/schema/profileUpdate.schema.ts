import {z} from "zod"
export const UpdateProfileSchema= z.object({
    fname:z.string().optional(),
    lname:z.string().optional(),
})

export type TProfileUpdateInput= z.infer<typeof UpdateProfileSchema>;