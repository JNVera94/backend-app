import { db } from '../shared/db/conn.js';
import { ObjectId } from 'mongodb';
/*
const MateriaArray = [
    new Materia(
      'Adrián',
      'Mecca',
      45,
      'mAdrian@hotmail.com',
      'Ingeniero en sistemas'
          )
  ];*/
const cMateria = db.collection('materia');
export class MateriaRepository {
    async findAll() {
        return await cMateria.find().toArray();
    }
    async findOne(item) {
        const _id = new ObjectId(item.id);
        return (await cMateria.findOne({ _id })) || undefined;
    }
    async add(item) {
        item._id = (await cMateria.insertOne(item)).insertedId;
        return item;
    }
    async update(id, item) {
        const _id = new ObjectId(id);
        return (await cMateria.findOneAndUpdate({ _id }, { $set: item }, { returnDocument: 'after' })) || undefined;
    }
    async remove(item) {
        const _id = new ObjectId(item.id);
        return (await cMateria.findOneAndDelete({ _id })) || undefined;
    }
}
//# sourceMappingURL=materia.repository.js.map