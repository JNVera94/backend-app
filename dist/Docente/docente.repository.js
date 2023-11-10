import { Docente } from './docente.entity.js';
import { db } from '../shared/db/conn.js';
import { ObjectId } from 'mongodb';
const DocentesArray = [
    new Docente('Adrián', 'Mecca', 45, 'mAdrian@hotmail.com', 'Ingeniero en sistemas')
];
const cDocentes = db.collection('docentes');
export class DocenteRepository {
    async findAll() {
        return await cDocentes.find().toArray();
    }
    async findOne(item) {
        const _id = new ObjectId(item.id);
        return (await cDocentes.findOne({ _id })) || undefined;
    }
    async add(item) {
        item._id = (await cDocentes.insertOne(item)).insertedId;
        return item;
    }
    async update(id, item) {
        const _id = new ObjectId(id);
        return (await cDocentes.findOneAndUpdate({ _id }, { $set: item }, { returnDocument: 'after' })) || undefined;
    }
    async remove(item) {
        const _id = new ObjectId(item.id);
        return (await cDocentes.findOneAndDelete({ _id })) || undefined;
    }
}
//# sourceMappingURL=docente.repository.js.map