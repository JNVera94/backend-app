import { Alumno } from './alumno.entity.js';
const Alumnos = [
    new Alumno('Julián', 'Vera', 29, 'julianvera-94@hotmail.com')
];
export class AlumnoRepository {
    async findAll() {
        return await Alumnos;
    }
    async findOne(item) {
        return await Alumnos.find((Alumno) => Alumno.legajo === item.id);
    }
    async add(item) {
        await Alumnos.push(item);
        return item;
    }
    async update(item) {
        const alumnoid = await Alumnos.findIndex((Alumno) => Alumno.legajo === item.legajo);
        if (alumnoid !== -1) {
            Alumnos[alumnoid] = { ...Alumnos[alumnoid], ...item };
        }
        return Alumnos[alumnoid];
    }
    async remove(item) {
        const alumnoid = Alumnos.findIndex((Alumno) => Alumno.legajo === item.id);
        if (alumnoid !== -1) {
            const deletedAlumnos = Alumnos[alumnoid];
            Alumnos.splice(alumnoid, 1);
            return deletedAlumnos;
        }
    }
}
//# sourceMappingURL=alumno.repository%20copy.js.map