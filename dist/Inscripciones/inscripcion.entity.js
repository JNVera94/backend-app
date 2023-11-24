var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Alumno } from '../Alumno/alumno.entity.js';
import { Materia } from '../Materias/materia.entity.js';
let Inscripcion = class Inscripcion extends BaseEntity {
};
__decorate([
    ManyToOne(() => Alumno),
    __metadata("design:type", Object)
], Inscripcion.prototype, "alumno", void 0);
__decorate([
    ManyToOne(() => Materia),
    __metadata("design:type", Object)
], Inscripcion.prototype, "materia", void 0);
__decorate([
    Property({ type: 'date' }),
    __metadata("design:type", Object)
], Inscripcion.prototype, "fechaInscripcion", void 0);
Inscripcion = __decorate([
    Entity()
], Inscripcion);
export { Inscripcion };
//# sourceMappingURL=inscripcion.entity.js.map