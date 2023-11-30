import { Alumno } from './alumno.entity.js';
import { orm } from '../shared/db/orm.js';
import { User } from '../User/user.entity.js';
const em = orm.em;
function sanitizeAlumnoInput(req, res, next) {
    console.log('a ver');
    req.body.sanitizedInput = {
        name: req.body.name,
        lastname: req.body.lastname,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
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
        const email = req.params.email;
        const oneAlumno = await em.findOne(Alumno, { email });
        if (oneAlumno) {
            res.status(200).json({ message: "Alumno encontrado", data: oneAlumno });
        }
        else {
            res.status(404).json({ message: "Alumno no encontrado", data: null });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOneId(req, res) {
    try {
        const id = req.params.id;
        const oneAlumno = await em.findOneOrFail(Alumno, { id });
        res.status(200).json({ message: "alumno encontrado", data: oneAlumno });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function checkEmailExists(req, res, next) {
    try {
        const email = req.body.sanitizedInput.email;
        const existingAlumno = await em.findOne(User, { email });
        if (existingAlumno) {
            return res.status(400).json({ message: 'El email ya está registrado', data: null });
        }
        next();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const emailExistsResponse = await em.findOne(User, { email: req.body.sanitizedInput.email });
        if (emailExistsResponse) {
            return res.status(400).json({ message: 'El email ya está registrado', data: null });
        }
        const user = em.create(User, {
            email: req.body.email,
            password: req.body.password,
        });
        await user.hashPassword();
        const alumno = em.create(Alumno, {
            ...req.body.sanitizedInput,
            user: user,
        });
        await em.flush();
        res.status(201).json({ message: 'alumno creado', data: alumno, user });
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
        const aalumno = await em.findOneOrFail(Alumno, { id });
        const email = (await aalumno).email;
        console.log(email);
        const user = await em.findOneOrFail(User, { email });
        console.log(aalumno);
        await em.removeAndFlush(aalumno);
        await em.removeAndFlush(user);
        res.status(201).json({ message: 'alumno eliminado', aalumno });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeAlumnoInput, findAll, findOne, findOneId, checkEmailExists, add, update, remove };
//# sourceMappingURL=alumno.controler.js.map