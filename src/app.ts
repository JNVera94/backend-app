import  Express, { NextFunction, Request, Response }  from 'express'
import {Alumno} from './Alumnos.js'

const app = Express()

app.use(Express.json())

//get /api/characters/ => obtener la lista de 
//get /api/characters/:id => obtener el character con id= :id
//post /api/characters/=> crear nuevo character
//delete /api/characters/:id=> borrar character con id= :id
//put & patch /api/characters/:id=> modificar character con id= :id
//character => /api/characters/

const Alumnos = [
    new Alumno(
      'Julián',
      'Vera',
      29,
      'julianvera-94@hotmail.com'
    ),
  ];

function sanitizeAlumnoInput(req: Request, res: Response, next: NextFunction){
    req.body.sanitizedInput={
        name: req.body.name,
        lastname: req.body.lastname,
        age: req.body.age,
        email: req.body.email,
    }
    Object.keys(req.body.sanitizedInput).forEach(key=>{
        if(req.body.sanitizedInput[key]===undefined){
            delete req.body.sanitizedInput[key]
        }
    })
    next()
}


app.get('/api/alumnos',(req,res)=>{
    res.json(Alumnos)
})

app.get('/api/alumnos/:id',(req,res)=>{
    const Alumno = Alumnos.find((Alumno)=>Alumno.legajo)
    if(!Alumno){
        res.status(404).send({message: 'Alumno Not Found'})
    }
    res.json(Alumno)
})

app.post('/api/alumnos',sanitizeAlumnoInput,(req,res)=>{
    
    const input=req.body.sanitizedInput
    const alumno = new Alumno(input.name,
        input.lastname,
        input.age,
        input.email,
        input.legajo)
    
    Alumnos.push(alumno)
    res.status(201).send({message:'Alumno created', data: Alumno})
})

app.put('/api/alumnos/:id',sanitizeAlumnoInput,(req,res)=>{
    const Alumnoid = Alumnos.findIndex((Alumno)=>Alumno.legajo===req.params.id)
    
    if(Alumnoid===-1){
        res.status(404).send({message: 'Alumno Not Found'})
    }
   
    Alumnos[Alumnoid]= {...Alumnos[Alumnoid],...req.body.sanitizedInput}

    res.status(200).send({message: 'Alumno modificado exitosamente',data: Alumnos})
})

app.patch('/api/alumnos/:id',sanitizeAlumnoInput,(req,res)=>{
    const Alumnoid = Alumnos.findIndex((Alumno)=>Alumno.legajo===req.params.id)
    
    if(Alumnoid===-1){
        res.status(404).send({message: 'Alumno Not Found'})
    }
   
    Alumnos[Alumnoid]= {...Alumnos[Alumnoid],...req.body.sanitizedInput}

    res.status(200).send({message: 'Alumno modificado exitosamente',data: Alumnos})
})

app.delete('/api/alumnos/:id',(req,res)=>{
    const Alumnoid = Alumnos.findIndex((Alumno)=>Alumno.legajo===req.params.id)
    
    if(Alumnoid===-1){
        res.status(404).send({message:'Alumno no encontrado'})
    }
    Alumnos.splice(Alumnoid,1)
    res.status(200).send({message: 'Alumno borrado exitosamente'})
})

app.listen(3000,()=> {
    console.log('Server running on http://localhost:3000/')
})

