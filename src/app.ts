import  Express from 'express'
import { AlumnoRouter } from './Alumno/alumno.routes.js';

const app = Express()

app.use(Express.json())




app.use('/api/alumnos',AlumnoRouter)


app.use((_,res)=>{
    return res.status(404).send({message:
    'Resource not found'})
})

app.listen(3000,()=> {
    console.log('Server running on http://localhost:3000/')
})

