import { Request,Response,NextFunction } from "express"
import {AlumnoRepository} from "./alumno.repository.js"
import { Alumno } from "./alumno.entity.js"

const repository = new AlumnoRepository()

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

async function findAll(req: Request,res:Response){
    res.json({data: await repository.findAll()})
}

async function findOne(req:Request,res:Response){
    const id = req.params.id
    const Alumno = await repository.findOne({id})
    if(!Alumno){
     return res.status(404).send({message: 'Alumno Not Found'})
    }
    res.json({data: Alumno})
}

async function add(req: Request,res: Response){

    const input=req.body.sanitizedInput
    const alumnoInput = new Alumno(input.name,
        input.lastname,
        input.age,
        input.email,
        input.legajo)
    
    const alumno = await repository.add(alumnoInput)
    return res.status(201).send({message:'Alumno created', data: Alumno})
}

async function update(req: Request, res: Response) {
    const Alumno = await repository.update(req.params.id, req.body.sanitizedInput)
  
    if (!Alumno) {
      return res.status(404).send({ message: 'Alumno not found' })
    }
  
    return res.status(200).send({ message: 'Alumno actualizado correctamente', data: Alumno })
  }

async function remove(req: Request,res: Response){
    const id = req.params.id
    const Alumno = await repository.remove({id})
    
    if(!Alumno){
       return res.status(404).send({message:'Alumno not found'})
    }else{
    
    return res.status(200).send({message: 'Alumno borrado exitosamente'})

    }
}


export{sanitizeAlumnoInput,findAll,findOne,add,update,remove}