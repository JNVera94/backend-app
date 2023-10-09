/*import {Repository} from '../shared/repository.js'
import { Alumno } from './alumno.entity.js'

const Alumnos = [
    new Alumno(
      'Julián',
      'Vera',
      29,
      'julianvera-94@hotmail.com',
          )
  ];

export class AlumnoRepository implements Repository<Alumno>{

  public async findAll(): Promise < Alumno[] | undefined> {
    return await Alumnos
  } 

  public async findOne(item: { id: string; }): Promise <Alumno | undefined> {
    return await Alumnos.find((Alumno)=>Alumno.legajo===item.id )
  }

  public async add(item: Alumno): Promise <Alumno | undefined> {
     await Alumnos.push(item)
     return item
  }

  public async update(item: Alumno): Promise <Alumno | undefined> {
    const alumnoid= await Alumnos.findIndex((Alumno)=>Alumno.legajo===item.legajo)
        if (alumnoid !== -1){
      Alumnos[alumnoid]={...Alumnos[alumnoid], ...item}
    }
    return Alumnos[alumnoid]
  }

 
   public async remove(item: { id: string; }): Promise <Alumno | undefined> {
    const alumnoid= Alumnos.findIndex((Alumno)=>Alumno.legajo===item.id)
    if (alumnoid !== -1){
      const deletedAlumnos =Alumnos[alumnoid]
    Alumnos.splice(alumnoid,1)
  return deletedAlumnos}
    }
    
    
  }

*/