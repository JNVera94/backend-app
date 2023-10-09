import {Repository} from '../shared/repository.js'
import { Materia } from './materia.entity.js'
import { db } from '../shared/db/conn.js';
import { ObjectId } from 'mongodb';
import { sanitizeMateriaInput } from './materia.controler.js';

/*
const MateriaArray = [
    new Materia(
      'Adrián',
      'Mecca',
      45,
      'mAdrian@hotmail.com',
      'Ingeniero en sistemas'
          )
  ];*/

const cMateria =db.collection<Materia>('materia')

export class MateriaRepository implements Repository<Materia>{

  public async findAll(): Promise < Materia[] | undefined> {
    return await cMateria.find().toArray()
  } 

  public async findOne(item: { id: string; }): Promise <Materia | undefined> {
    const _id = new ObjectId(item.id);
    return (await cMateria.findOne({_id})) || undefined
     }

  public async add(item: Materia): Promise <Materia | undefined> {
     item._id=(await cMateria.insertOne(item)).insertedId
     return item
  }


  public async update(id: string, item: Materia): Promise<Materia | undefined> {
    const _id = new ObjectId(id)
    return (await cMateria.findOneAndUpdate({ _id }, { $set: item }, { returnDocument: 'after' })) || undefined
  }


 
   public async remove(item: { id: string; }): Promise <Materia | undefined> {
    const _id= new ObjectId(item.id)
    return ( await cMateria.findOneAndDelete({_id})) || undefined
    }
    
    
  }

