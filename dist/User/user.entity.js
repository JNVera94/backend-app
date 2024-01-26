var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import bcrypt from 'bcryptjs';
import { Entity, Property, OneToOne } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Alumno } from '../Alumno/alumno.entity.js';
import * as jsonwebtoken from 'jsonwebtoken';
const { sign, verify } = jsonwebtoken;
let User = class User extends BaseEntity {
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }
    async comparePassword(candidatePassword) {
        return bcrypt.compare(candidatePassword, this.password);
    }
    generateToken() {
        return sign({ userId: this.id }, 'secreto', { expiresIn: '1h' });
    }
    static verifyToken(token) {
        return verify(token, 'secreto');
    }
};
__decorate([
    Property(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Property({ hidden: true, length: 60 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Property(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    OneToOne(() => Alumno, { nullable: true }),
    __metadata("design:type", Alumno)
], User.prototype, "alumno", void 0);
User = __decorate([
    Entity()
], User);
export { User };
//# sourceMappingURL=user.entity.js.map