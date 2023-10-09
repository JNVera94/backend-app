import { Request,Response,NextFunction } from "express"
import {MateriaRepository} from "./materia.repository.js"
import { Materia } from "./materia.entity.js"

const repository = new MateriaRepository()

function sanitizeMateriaInput(req: Request, res: Response, next: NextFunction){
    req.body.sanitizedInput={
        name: req.body.name,
        totalhours: req.body.totalhours,
        email: req.body.email,
        nivel: req.body.nivel
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
    const Materia = await repository.findOne({id})
    if(!Materia){
     return res.status(404).send({message: 'Materia Not Found'})
    }
    res.json({data: Materia})
}

async function add(req: Request,res: Response){

    const input=req.body.sanitizedInput
    const materiaInput = new Materia(input.name,
        input.totalhours,
        input.email,
        input.nivel)
    
    const materia = await repository.add(materiaInput)
    return res.status(201).send({message:'Materia created', data: Materia})
}
async function update(req: Request, res: Response) {
    const Materia = await repository.update(req.params.id, req.body.sanitizedInput)
  
    if (!Materia) {
      return res.status(404).send({ message: 'Materia not found' })
    }
  
    return res.status(200).send({ message: 'Materia actualizada correctamente', data: Materia })
  }


async function remove(req: Request,res: Response){
    const id = req.params.id
    const Materia = await repository.remove({id})
    
    if(!Materia){
       return res.status(404).send({message:'Materia not found'})
    }else{
    
    return res.status(200).send({message: 'Materia borrada exitosamente'})

    }
}


export{sanitizeMateriaInput,findAll,findOne,add,update,remove}