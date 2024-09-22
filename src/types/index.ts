import {z} from 'zod'

/** Projects */

export const projectSchema = z.object({
    _id: z.string(),
    projectName : z.string(),
    clientName : z.string(),
    description : z.string(),
})

export const dasboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
    })
)

export type Project = z.infer<typeof projectSchema>
//reutilizo el type de Project para redefir el type del formProject 
export type ProjectFormData = Pick< Project, 'clientName' | 'description' | 'projectName' >