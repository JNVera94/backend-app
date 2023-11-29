import { orm } from '../shared/db/orm.js';
import { Contacto } from './contacto.entity.js';
const em = orm.em;
function sanitizeContactoInput(req, res, next) {
    req.body.sanitizedInput = {
        name: req.body.name,
        email: req.body.email,
        tel: req.body.tel,
        city: req.body.city,
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
        const contacto = await em.find(Contacto, {});
        res.status(200).json({ message: "mensajes encontradas", data: contacto });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = req.params.id;
        const oneMensaje = await em.findOneOrFail(Contacto, { id });
        res.status(200).json({ message: "mensaje encontrado", data: oneMensaje });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const acontacto = em.create(Contacto, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'mensaje creado', data: acontacto });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = req.params.id;
        const amensaje = em.getReference(Contacto, id);
        await em.removeAndFlush(amensaje);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeContactoInput, findAll, findOne, add, remove };
//# sourceMappingURL=contacto.controler.js.map