import {Repository} from '../shared/repository.js'
import { Alumno } from './alumno.entity.js'
import { db } from '../shared/db/conn.js';
import { ObjectId } from 'mongodb';
import { sanitizeAlumnoInput } from './alumno.controler.js';

const AlumnosArray = [
    new Alumno(
      'Julián',
      'Vera',
      29,
      'julianvera-94@hotmail.com',
          )
  ];

const cAlumnos =db.collection<Alumno>('alumnos')

export class AlumnoRepository implements Repository<Alumno>{

  public async findAll(): Promise < Alumno[] | undefined> {
    return await cAlumnos.find().toArray()
  } 

  public async findOne(item: { id: string; }): Promise <Alumno | undefined> {
    const _id = new ObjectId(item.id);
    return (await cAlumnos.findOne({_id})) || undefined
     }

  public async add(item: Alumno): Promise <Alumno | undefined> {
     item._id=(await cAlumnos.insertOne(item)).insertedId
     return item
  }


  public async update(id: string, item: Alumno): Promise<Alumno | undefined> {
    const _id = new ObjectId(id)
    return (await cAlumnos.findOneAndUpdate({ _id }, { $set: item }, { returnDocument: 'after' })) || undefined
  }

 
   public async remove(item: { id: string; }): Promise <Alumno | undefined> {
    const _id= new ObjectId(item.id)
    return ( await cAlumnos.findOneAndDelete({_id})) || undefined
    }
    
    
  }

