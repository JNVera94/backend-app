import {
  Entity,
  Property,
  ManyToMany,
  Cascade,
  ManyToOne,
  Rel,
  Collection,
  OneToMany
  
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.js'
import { Inscripcion } from '../Inscripciones/inscripcion.entity.js'
import { ObjectId } from '@mikro-orm/mongodb'

@Entity()
export class Materia extends BaseEntity {

       @Property()
       name!: string

       @Property()
       totalhours!: number

       @Property()
       email!: string

       @Property()
       nivel!: number

       @Property()
       desc!: string
       
       @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.materia)
       inscripciones = new Collection<Inscripcion>(this);

     }
  

