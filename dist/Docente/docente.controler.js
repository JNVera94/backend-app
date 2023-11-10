import { DocenteRepository } from "./docente.repository.js";
import { Docente } from "./docente.entity.js";
const repository = new DocenteRepository();
function sanitizeDocenteInput(req, res, next) {
    req.body.sanitizedInput = {
        name: req.body.name,
        lastname: req.body.lastname,
        age: req.body.age,
        email: req.body.email,
        titulo: req.body.titulo
    };
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
async function findAll(req, res) {
    res.json({ data: await repository.findAll() });
}
async function findOne(req, res) {
    const id = req.params.id;
    const Docente = await repository.findOne({ id });
    if (!Docente) {
        return res.status(404).send({ message: 'Docente Not Found' });
    }
    res.json({ data: Docente });
}
async function add(req, res) {
    const input = req.body.sanitizedInput;
    const docenteInput = new Docente(input.name, input.lastname, input.age, input.email, input.titulo);
    const docente = await repository.add(docenteInput);
    return res.status(201).send({ message: 'Docente created', data: Docente });
}
async function update(req, res) {
    const Docente = await repository.update(req.params.id, req.body.sanitizedInput);
    if (!Docente) {
        return res.status(404).send({ message: 'Docente not found' });
    }
    return res.status(200).send({ message: 'Docente actualizado correctamente', data: Docente });
}
async function remove(req, res) {
    const id = req.params.id;
    const Docente = await repository.remove({ id });
    if (!Docente) {
        return res.status(404).send({ message: 'Docente not found' });
    }
    else {
        return res.status(200).send({ message: 'Docente borrado exitosamente' });
    }
}
export { sanitizeDocenteInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=docente.controler.js.map