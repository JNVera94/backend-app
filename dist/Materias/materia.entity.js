var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, Collection, OneToMany } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Inscripcion } from '../Inscripciones/inscripcion.entity.js';
let Materia = class Materia extends BaseEntity {
    constructor() {
        super(...arguments);
        this.inscripciones = new Collection(this);
    }
};
__decorate([
    Property(),
    __metadata("design:type", String)
], Materia.prototype, "name", void 0);
__decorate([
    Property(),
    __metadata("design:type", Number)
], Materia.prototype, "totalhours", void 0);
__decorate([
    Property(),
    __metadata("design:type", String)
], Materia.prototype, "email", void 0);
__decorate([
    Property(),
    __metadata("design:type", Number)
], Materia.prototype, "nivel", void 0);
__decorate([
    Property(),
    __metadata("design:type", String)
], Materia.prototype, "desc", void 0);
__decorate([
    Property(),
    __metadata("design:type", String)
], Materia.prototype, "icono", void 0);
__decorate([
    OneToMany(() => Inscripcion, (inscripcion) => inscripcion.materia),
    __metadata("design:type", Object)
], Materia.prototype, "inscripciones", void 0);
Materia = __decorate([
    Entity()
], Materia);
export { Materia };
//# sourceMappingURL=materia.entity.js.map