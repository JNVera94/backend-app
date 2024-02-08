import { Inscripcion } from './inscripcion.entity.js';
import { orm } from '../shared/db/orm.js';
const em = orm.em;
function sanitizeInscripcionInput(req, res, next) {
    const { student_id, course_id, inscription_date } = req.body;
    if (!student_id || !course_id) {
        return res.status(400).json({ message: 'Debe proporcionar student_id y course_id para la inscripción' });
    }
    req.body.sanitizedInput = {
        student_id: req.body.student_id,
        course_id: req.body.course_id,
        inscription_date: req.body.inscription_date || new Date(),
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
        const { student_id, course_id, inscription_date } = req.body;
        console.log(`Alumno ID: ${student_id}, Materia ID: ${course_id}, Fecha Inscripción: ${inscription_date}`);
        const student = await em.findOneOrFail('Alumno', { id: student_id });
        const course = await em.findOneOrFail('Materia', { id: course_id });
        const inscripcion = em.create(Inscripcion, {
            student: student,
            course: course,
            inscription_date: inscription_date || new Date(),
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
async function removebyCourseId(course_id, res) {
    try {
        const inscriptions = await em.find(Inscripcion, { course: course_id });
        // Eliminar las inscripciones en paralelo y esperar que todas se completen
        await Promise.all(inscriptions.map(async (inscription) => {
            await em.removeAndFlush(inscription);
        }));
        return;
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findByStudentId(req, res) {
    try {
        const idStudent = req.params.idStudent;
        const inscriptions = await em.find(Inscripcion, { student: idStudent });
        res.status(200).json({ message: "Inscripciones encontradas para el alumno", data: inscriptions });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeInscripcionInput, findAll, findOne, add, update, remove, findByStudentId, removebyCourseId };
//# sourceMappingURL=inscripcion.controler.js.map