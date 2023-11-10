import { Alumno } from './alumno.entity.js';
import { db } from '../shared/db/conn.js';
import { ObjectId } from 'mongodb';
const AlumnosArray = [
    new Alumno('Julián', 'Vera', 29, 'julianvera-94@hotmail.com')
];
const cAlumnos = db.collection('alumnos');
export class AlumnoRepository {
    async findAll() {
        return await cAlumnos.find().toArray();
    }
    async findOne(item) {
        const _id = new ObjectId(item.id);
        return (await cAlumnos.findOne({ _id })) || undefined;
    }
    async add(item) {
        item._id = (await cAlumnos.insertOne(item)).insertedId;
        return item;
    }
    async update(id, item) {
        const _id = new ObjectId(id);
        return (await cAlumnos.findOneAndUpdate({ _id }, { $set: item }, { returnDocument: 'after' })) || undefined;
    }
    async remove(item) {
        const _id = new ObjectId(item.id);
        return (await cAlumnos.findOneAndDelete({ _id })) || undefined;
    }
}
//# sourceMappingURL=alumno.repository.js.map