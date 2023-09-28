import {Repository} from '../shared/repository.js'
import { Alumno } from './alumno.entity.js'

const Alumnos = [
    new Alumno(
      'Julián',
      'Vera',
      29,
      'julianvera-94@hotmail.com',
      '10'
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
    // Buscar el alumno por su id utilizando la función findOne
    const existingAlumno = this.findOne({ id: item.legajo });
  
    if (existingAlumno) {
      // Actualizar el alumno encontrado con los datos proporcionados en 'item'
      const updatedAlumno = { ...existingAlumno, ...item };
  
      // Reemplazar el antiguo alumno con el alumno actualizado en la lista Alumnos
      const alumnoid = Alumnos.findIndex((Alumno) => Alumno.legajo === item.legajo);
      if (alumnoid !== -1) {
        Alumnos[alumnoid] = updatedAlumno;
      }
  
      // Devolver el alumno actualizado
      return updatedAlumno;
    } else {
      // Si no se encontró el alumno, devolver undefined
      return undefined;
    }
  }
 
   public remove(item: { id: string; }): Alumno | undefined {
    const alumnoid= Alumnos.findIndex((Alumno)=>Alumno.legajo===item.id)
    if (alumnoid !== -1){
      const deletedAlumnos =Alumnos[alumnoid]
    Alumnos.splice(alumnoid,1)
  return deletedAlumnos}
    }
    
    
  }

