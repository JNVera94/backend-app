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
import { Alumno } from '../Alumno/alumno.entity.js'
import { Materia } from '../Materias/materia.entity.js'

@Entity()
export class Inscripcion extends BaseEntity {

  @ManyToMany(() => Alumno, (alumnos) => alumnos.inscripciones)
  alumnos = new Collection<Alumno>(this)

  @ManyToMany(() => Materia, (materias) => materias.inscripciones)
  materias = new Collection<Materia>(this)

 

}