import { Materia } from './materia.entity.js';
import { orm } from '../shared/db/orm.js';
const em = orm.em;
function sanitizeMateriaInput(req, res, next) {
    req.body.sanitizedInput = {
        name: req.body.name,
        totalhours: req.body.totalhours,
        email: req.body.email,
        nivel: req.body.nivel,
        desc: req.body.desc,
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
        const materias = await em.find(Materia, {});
        res.status(200).json({ message: "todas las materias encontradas", data: materias });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = req.params.id;
        const oneMateria = await em.findOneOrFail(Materia, { id });
        res.status(200).json({ message: "materia encontrada", data: oneMateria });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const amateria = em.create(Materia, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'materia creada', data: amateria });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = req.params.id;
        const materiaupdate = await em.findOneOrFail(Materia, { id });
        em.assign(materiaupdate, req.body.sanitizedInput);
        await em.flush();
        res
            .status(200)
            .json({ message: 'materia modificada', data: materiaupdate });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = req.params.id;
        const amateria = em.getReference(Materia, id);
        await em.removeAndFlush(amateria);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeMateriaInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=materia.controler.js.map