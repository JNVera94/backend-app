import { Request, Response, NextFunction } from 'express'
import { Alumno } from './alumno.entity.js'
import { orm } from '../shared/db/orm.js'
import { User } from '../User/user.entity.js'

const em = orm.em


function sanitizeAlumnoInput(req: Request, res: Response, next: NextFunction){
    console.log('a ver')
    req.body.sanitizedInput={
        name: req.body.name,
        lastname: req.body.lastname,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
    }
    console.log('a ver 2')
    Object.keys(req.body.sanitizedInput).forEach(key=>{
        if(req.body.sanitizedInput[key]===undefined){
            delete req.body.sanitizedInput[key]
        }
    })
    console.log('a ver 3')
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
      const email = req.params.email
      const oneAlumno = await em.findOneOrFail(
        Alumno,
        { email },
       
      )
      res.status(200).json({message: "alumno encontrado",data: oneAlumno})
    }catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function findOneId(req: Request, res: Response) {
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
  console.log('aver 4')
  try {
    const user = em.create(User, {
      email: req.body.email, 
      password: req.body.password, 
      
    });
    console.log('a ver 5')
    await user.hashPassword();

    const alumno = em.create(Alumno, {
      ...req.body.sanitizedInput,
      user: user,
    });

    await em.flush();

    

    res.status(201).json({ message: 'alumno creado', data: alumno,user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
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
      const aalumno = await em.findOneOrFail(Alumno, {id})
      const email= (await aalumno).email
      console.log(email)
      const user = await em.findOneOrFail(
        User,
        { email },
      )
      console.log(aalumno)
      await em.removeAndFlush(aalumno)
      await em.removeAndFlush(user)
     
      res.status(201).json({ message: 'alumno eliminado', aalumno });   
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }


export{sanitizeAlumnoInput,findAll,findOne,findOneId,add,update,remove}