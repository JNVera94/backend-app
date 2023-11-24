import {
  Entity,
  Property,
  ManyToOne,
  Rel
} from '@mikro-orm/core'

import { BaseEntity } from '../shared/db/baseEntity.js'
import { Alumno } from '../Alumno/alumno.entity.js'
import { Materia } from '../Materias/materia.entity.js'

@Entity()
export class Inscripcion extends BaseEntity {

  @ManyToOne(() => Alumno)
  alumno!: Rel<Alumno>;
  
  @ManyToOne(() => Materia)
  materia!: Rel<Materia>;

  @Property({ type: 'date' })
  fechaInscripcion: Date | undefined;
}