import {
  Entity,
  Property,
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
       level!: number

       @Property()
       desc!: string

       @Property()
       icon!: string
       
       @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.course)
       inscripciones = new Collection<Inscripcion>(this);

     }
  

