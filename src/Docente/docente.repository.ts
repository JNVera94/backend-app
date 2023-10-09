import {Repository} from '../shared/repository.js'
import { Docente } from './docente.entity.js'
import { db } from '../shared/db/conn.js';
import { ObjectId } from 'mongodb';
import { sanitizeDocenteInput } from './docente.controler.js';

const DocentesArray = [
    new Docente(
      'Adrián',
      'Mecca',
      45,
      'mAdrian@hotmail.com',
      'Ingeniero en sistemas'
          )
  ];

const cDocentes =db.collection<Docente>('docentes')

export class DocenteRepository implements Repository<Docente>{

  public async findAll(): Promise < Docente[] | undefined> {
    return await cDocentes.find().toArray()
  } 

  public async findOne(item: { id: string; }): Promise <Docente | undefined> {
    const _id = new ObjectId(item.id);
    return (await cDocentes.findOne({_id})) || undefined
     }

  public async add(item: Docente): Promise <Docente | undefined> {
     item._id=(await cDocentes.insertOne(item)).insertedId
     return item
  }


  public async update(id: string, item: Docente): Promise<Docente | undefined> {
    const _id = new ObjectId(id)
    return (await cDocentes.findOneAndUpdate({ _id }, { $set: item }, { returnDocument: 'after' })) || undefined
  }


 
   public async remove(item: { id: string; }): Promise <Docente | undefined> {
    const _id= new ObjectId(item.id)
    return ( await cDocentes.findOneAndDelete({_id})) || undefined
    }
    
    
  }

