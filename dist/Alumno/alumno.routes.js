import { Router } from "express";
import { sanitizeAlumnoInput, findAll, findOne, add, update, remove } from "./alumno.controler.js";
export const AlumnoRouter = Router();
AlumnoRouter.get('/', findAll);
AlumnoRouter.get('/:id', findOne);
AlumnoRouter.post('/', sanitizeAlumnoInput, add);
AlumnoRouter.put('/:id', sanitizeAlumnoInput, update);
AlumnoRouter.patch('/:id', sanitizeAlumnoInput, update);
AlumnoRouter.delete('/:id', remove);
//# sourceMappingURL=alumno.routes.js.map