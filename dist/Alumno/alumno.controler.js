import { Alumno } from './alumno.entity.js';
import { orm } from '../shared/db/orm.js';
const em = orm.em;
function sanitizeAlumnoInput(req, res, next) {
    req.body.sanitizedInput = {
        name: req.body.name,
        lastname: req.body.lastname,
        age: req.body.age,
        email: req.body.email,
    };
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
async function findAll(req, res) {
    try {
        const alumnos = await em.find(Alumno, {});
        res.status(200).json({ message: "todos los alumnos encontrados", data: alumnos });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = req.params.id;
        const oneAlumno = await em.findOneOrFail(Alumno, { id });
        res.status(200).json({ message: "alumno encontrado", data: oneAlumno });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const aalumno = em.create(Alumno, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'alumno creado', data: aalumno });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = req.params.id;
        const alumnoupdate = await em.findOneOrFail(Alumno, { id });
        em.assign(alumnoupdate, req.body.sanitizedInput);
        await em.flush();
        res
            .status(200)
            .json({ message: 'alumno modificado correctamente', data: alumnoupdate });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = req.params.id;
        const aalumno = em.getReference(Alumno, id);
        await em.removeAndFlush(aalumno);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeAlumnoInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=alumno.controler.js.map