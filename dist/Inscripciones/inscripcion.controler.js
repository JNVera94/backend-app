import { Inscripcion } from './inscripcion.entity.js';
import { orm } from '../shared/db/orm.js';
const em = orm.em;
function sanitizeInscripcionInput(req, res, next) {
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
        const inscripciones = await em.find(Inscripcion, {});
        res.status(200).json({ message: "todas las inscripciones encontradas", data: inscripciones });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = req.params.id;
        const oneinscripcion = await em.findOneOrFail(Inscripcion, { id });
        res.status(200).json({ message: "inscripcion encontrada", data: oneinscripcion });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const ainscripcion = em.create(Inscripcion, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'inscripcion creada', data: ainscripcion });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = req.params.id;
        const inscripcionupdate = await em.findOneOrFail(Inscripcion, { id });
        em.assign(inscripcionupdate, req.body.sanitizedInput);
        await em.flush();
        res
            .status(200)
            .json({ message: 'inscripcion modificada correctamente', data: inscripcionupdate });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = req.params.id;
        const ainscripcion = em.getReference(Inscripcion, id);
        await em.removeAndFlush(ainscripcion);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeInscripcionInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=inscripcion.controler.js.map