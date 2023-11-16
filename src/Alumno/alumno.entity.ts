import {
  Entity,
  Property,
  ManyToMany,
  Cascade,
  ManyToOne,
  Rel,
  Collection,
  OneToMany,
  
} from '@mikro-orm/core'
import { Exclude } from 'class-transformer';
import { Inscripcion } from '../Inscripciones/inscripcion.entity.js'
import { BaseEntity } from '../shared/db/baseEntity.js'

@Entity()
export class Alumno extends BaseEntity {

       @Property()
       name!: string

       @Property()
       lastname!: string

       @Property()
       age!: number

       @Property()
       email!: string

       @Exclude()
       password!: string

       @ManyToMany(() => Inscripcion, (inscripciones) => inscripciones.alumnos, {
        
        owner: true,
      })
      inscripciones = new Collection<Inscripcion>(this)
     
       

     }
  