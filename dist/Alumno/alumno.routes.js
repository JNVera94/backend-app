import { Router } from "express";
import { sanitizeAlumnoInput, findAll, findOne, findOneId, checkEmailExists, add, update, remove } from "./alumno.controler.js";
import { validarToken } from "../middlewares/interceptor.token.js";
export const AlumnoRouter = Router();
AlumnoRouter.post('/', sanitizeAlumnoInput, checkEmailExists, add);
AlumnoRouter.get('/email/:email', findOne);
AlumnoRouter.get('/', findAll);
AlumnoRouter.get('/:id', findOneId);
AlumnoRouter.use(validarToken);
AlumnoRouter.put('/:id', sanitizeAlumnoInput, update);
AlumnoRouter.patch('/:id', sanitizeAlumnoInput, update);
AlumnoRouter.delete('/:id', remove);
//# sourceMappingURL=alumno.routes.js.map