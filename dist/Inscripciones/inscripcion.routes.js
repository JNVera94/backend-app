import { Router } from "express";
import { sanitizeInscripcionInput, findAll, findOne, add, update, remove } from "./inscripcion.controler.js";
export const InscripcionRouter = Router();
InscripcionRouter.get('/', findAll);
InscripcionRouter.get('/:id', findOne);
InscripcionRouter.post('/', sanitizeInscripcionInput, add);
InscripcionRouter.put('/:id', sanitizeInscripcionInput, update);
InscripcionRouter.patch('/:id', sanitizeInscripcionInput, update);
InscripcionRouter.delete('/:id', remove);
//# sourceMappingURL=inscripcion.routes.js.map