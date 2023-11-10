import { Request, Response, NextFunction } from 'express'
import { Alumno } from './alumno.entity.js'
import { orm } from '../shared/db/orm.js'

const em = orm.em


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
    try{
        const alumnos = await em.find(
            Alumno,{},
        )
        res.status(200).json({message: "todos los alumnos encontrados",data: alumnos})
    }catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function findOne(req: Request, res: Response) {
    try {
      const id = req.params.id
      const oneAlumno = await em.findOneOrFail(
        Alumno,
        { id },
       
      )
      res.status(200).json({message: "alumno encontrado",data: oneAlumno})
    }catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function add(req: Request, res: Response) {
    try {
      const aalumno = em.create(Alumno, req.body.sanitizedInput)
      await em.flush()
      res.status(201).json({ message: 'alumno creado', data: aalumno })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
  
  async function update(req: Request, res: Response) {
    try {
      const id = req.params.id
      const alumnoupdate = await em.findOneOrFail(Alumno, { id })
      em.assign(alumnoupdate, req.body.sanitizedInput)
      await em.flush()
      res
        .status(200)
        .json({ message: 'alumno modificado correctamente', data: alumnoupdate })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
  

  async function remove(req: Request, res: Response) {
    try {
      const id = req.params.id
      const aalumno = em.getReference(Alumno, id)
      await em.removeAndFlush(aalumno)
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }


export{sanitizeAlumnoInput,findAll,findOne,add,update,remove}