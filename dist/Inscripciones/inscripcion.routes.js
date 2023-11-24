import { Router } from "express";
import { sanitizeInscripcionInput, findAll, findOne, add, update, remove, findByAlumnoId } from "./inscripcion.controler.js";
export const InscripcionRouter = Router();
InscripcionRouter.get('/', findAll);
InscripcionRouter.get('/:id', findOne);
InscripcionRouter.post('/', add);
InscripcionRouter.put('/:id', sanitizeInscripcionInput, update);
InscripcionRouter.patch('/:id', sanitizeInscripcionInput, update);
InscripcionRouter.delete('/:id', remove);
InscripcionRouter.get('/alumno/:idAlumno', findByAlumnoId);
//# sourceMappingURL=inscripcion.routes.js.map