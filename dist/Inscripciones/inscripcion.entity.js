var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, ManyToMany, Collection } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Alumno } from '../Alumno/alumno.entity.js';
import { Materia } from '../Materias/materia.entity.js';
let Inscripcion = class Inscripcion extends BaseEntity {
    constructor() {
        super(...arguments);
        this.alumnos = new Collection(this);
        this.materias = new Collection(this);
    }
};
__decorate([
    ManyToMany(() => Alumno, (alumnos) => alumnos.inscripciones),
    __metadata("design:type", Object)
], Inscripcion.prototype, "alumnos", void 0);
__decorate([
    ManyToMany(() => Materia, (materias) => materias.inscripciones),
    __metadata("design:type", Object)
], Inscripcion.prototype, "materias", void 0);
Inscripcion = __decorate([
    Entity()
], Inscripcion);
export { Inscripcion };
//# sourceMappingURL=inscripcion.entity.js.map