var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToMany, Collection, } from '@mikro-orm/core';
import { Inscripcion } from '../Inscripciones/inscripcion.entity.js';
import { BaseEntity } from '../shared/db/baseEntity.js';
let Alumno = class Alumno extends BaseEntity {
    constructor() {
        super(...arguments);
        this.inscripciones = new Collection(this);
    }
};
__decorate([
    Property(),
    __metadata("design:type", String)
], Alumno.prototype, "name", void 0);
__decorate([
    Property(),
    __metadata("design:type", String)
], Alumno.prototype, "lastname", void 0);
__decorate([
    Property(),
    __metadata("design:type", Number)
], Alumno.prototype, "age", void 0);
__decorate([
    Property(),
    __metadata("design:type", String)
], Alumno.prototype, "email", void 0);
__decorate([
    ManyToMany(() => Inscripcion, (inscripciones) => inscripciones.alumnos, {
        owner: true,
    }),
    __metadata("design:type", Object)
], Alumno.prototype, "inscripciones", void 0);
Alumno = __decorate([
    Entity()
], Alumno);
export { Alumno };
//# sourceMappingURL=alumno.entity.js.map