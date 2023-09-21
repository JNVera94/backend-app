import {Repository} from '../shared/repository.js'
import { Alumno } from './alumno.entity.js'

const Alumnos = [
    new Alumno(
      'Julián',
      'Vera',
      29,
      'julianvera-94@hotmail.com'
    ),
  ];

export class AlumnoRepository implements Repository<Alumno>{

  public  findAll(): Alumno[] | undefined {
    return Alumnos
  } 

  public  findOne(item: { id: string; }): Alumno | undefined {
    return Alumnos.find((Alumno)=>Alumno.legajo===item.id )
  }

  public  add(item: Alumno): Alumno | undefined {
     Alumnos.push(item)
     return item
  }

  public update(item: Alumno): Alumno | undefined {
    const alumnoid= Alumnos.findIndex((Alumno)=>Alumno.legajo===item.legajo)
    if (alumnoid !== -1){
      Alumnos[alumnoid]={...Alumnos[alumnoid], ...item}
    }
    return Alumnos[alumnoid]
  }

 
   public remove(item: { id: string; }): Alumno | undefined {
    const alumnoid= Alumnos.findIndex((Alumno)=>Alumno.legajo===item.id)
    if (alumnoid !== -1){
      const deletedAlumnos =Alumnos[alumnoid]
    Alumnos.splice(alumnoid,1)
  return deletedAlumnos}
    }
    
    
  }

