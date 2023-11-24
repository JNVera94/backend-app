import { Router } from "express";
import { sanitizeAlumnoInput, findAll, findOne, findOneId, add, update, remove } from "./alumno.controler.js";
export const AlumnoRouter = Router();
AlumnoRouter.get('/', findAll);
AlumnoRouter.get('/email/:email', findOne);
AlumnoRouter.get('/:id', findOneId);
AlumnoRouter.post('/', sanitizeAlumnoInput, add);
AlumnoRouter.put('/:id', sanitizeAlumnoInput, update);
AlumnoRouter.patch('/:id', sanitizeAlumnoInput, update);
AlumnoRouter.delete('/:id', remove);
//# sourceMappingURL=alumno.routes.js.map