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

function findAll(req: Request,res:Response){
    res.json({data: repository.findAll()})
}

function findOne(req:Request,res:Response){
    const id = req.params.id
    const Alumno = repository.findOne({id})
    if(!Alumno){
     return res.status(404).send({message: 'Alumno Not Found'})
    }
    res.json({data: Alumno})
}

function add(req: Request,res: Response){

    const input=req.body.sanitizedInput
    const alumnoInput = new Alumno(input.name,
        input.lastname,
        input.age,
        input.email,
        input.legajo)
    
    const alumno = repository.add(alumnoInput)
    return res.status(201).send({message:'Alumno created', data: Alumno})
}

function update(req: Request, res: Response) {
    const id = req.params.id;
    const updatedAlumnoData = req.body.sanitizedInput;
  
    const Alumno = repository.findOne({ id });
  
    if (!Alumno) {
      return res.status(404).send({ message: 'Alumno Not Found' });
    }
  
    const updatedAlumno = { ...Alumno, ...updatedAlumnoData };
  
    const updatedResult = repository.update(updatedAlumno);
  
    if (!updatedResult) {
      return res.status(404).send({ message: 'Alumno Not Found' });
    }
  
    return res.status(200).send({ message: 'Alumno modificado exitosamente', data: updatedResult });
  }


function remove(req: Request,res: Response){
    const id = req.params.id
    const Alumno = repository.remove({id})
    
    if(!Alumno){
       return res.status(404).send({message:'Alumno not found'})
    }else{
    
    return res.status(200).send({message: 'Alumno borrado exitosamente'})

    }
}


export{sanitizeAlumnoInput,findAll,findOne,add,update,remove}