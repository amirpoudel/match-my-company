import {z} from "zod";

export const matchSchemaValidation  = z.object({
    userName:z.string(),
    companyName:z.string(),
    compatibilityScore:z.number(),
    compatibility:z.string()
})