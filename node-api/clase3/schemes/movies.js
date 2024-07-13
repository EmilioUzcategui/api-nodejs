const z= require('zod')

const movieSchema = z.object({
    title:z.string({
        invalid_type_error:'movie title must be a string',
        required_error:'please checkout'
    }),
    year: z.number().int().positive().min(1900).max(2024),
    director:z.string(),
    duration:z.number().positive(),
    rate: z.number().positive().min(0).max(10).default(5.5),
    poster: z.string().url({
        message: 'poster must be a valid url'
    }),
    genre:z.array(
        z.enum(['Action','Crime','Romance','Adventure','comedy','Drama','Fantasy','Horror','Thriller','Sci-Fi']),
        {
            required_error: 'movie genre is required',
            invalid_type_error: 'movie genre must be an array of enum genres'
        }
    )


})

function validateMovie(object){
    return movieSchema.safeParse(object)
}

function validatePartialMovie(input){
    return movieSchema.partial().safeParse(input)
}

module.exports={
    validateMovie,validatePartialMovie
}