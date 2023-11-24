import { Inscripcion } from './inscripcion.entity.js';
import { orm } from '../shared/db/orm.js';
const em = orm.em;
function sanitizeInscripcionInput(req, res, next) {
    const { alumnoId, materiaId, fechaInscripcion } = req.body;
    if (!alumnoId || !materiaId) {
        return res.status(400).json({ message: 'Debe proporcionar alumnoId y materiaId para la inscripción' });
    }
    console.log('validacion 1');
    req.body.sanitizedInput = {
        alumnoId: req.body.alumnoId,
        materiaId: req.body.materiaId,
        fechaInscripcion: req.body.fechaInscripcion || new Date(),
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
    console.log('entro al add');
    try {
        const { alumnoId, materiaId, fechaInscripcion } = req.body;
        console.log(`Alumno ID: ${alumnoId}, Materia ID: ${materiaId}, Fecha Inscripción: ${fechaInscripcion}`);
        const alumno = await em.findOneOrFail('Alumno', { id: alumnoId });
        const materia = await em.findOneOrFail('Materia', { id: materiaId });
        const inscripcion = em.create(Inscripcion, {
            alumno: alumno,
            materia: materia,
            fechaInscripcion: fechaInscripcion || new Date(),
        });
        await em.persistAndFlush(inscripcion);
        res.status(201).json({ message: 'Inscripción creada exitosamente', data: inscripcion });
    }
    catch (error) {
        console.error('Error al procesar la inscripción:', error);
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
        res.status(200).json({ message: 'Inscripcion Eliminada' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findByAlumnoId(req, res) {
    try {
        const idAlumno = req.params.idAlumno;
        console.log(idAlumno);
        const inscripciones = await em.find(Inscripcion, { alumno: idAlumno });
        res.status(200).json({ message: "Inscripciones encontradas para el alumno", data: inscripciones });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeInscripcionInput, findAll, findOne, add, update, remove, findByAlumnoId };
//# sourceMappingURL=inscripcion.controler.js.map