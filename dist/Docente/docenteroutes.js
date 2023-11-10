import { Router } from "express";
import { sanitizeDocenteInput, findAll, findOne, add, update, remove } from "./docente.controler.js";
export const DocenteRouter = Router();
DocenteRouter.get('/', findAll);
DocenteRouter.get('/:id', findOne);
DocenteRouter.post('/', sanitizeDocenteInput, add);
DocenteRouter.put('/:id', sanitizeDocenteInput, update);
DocenteRouter.patch('/:id', sanitizeDocenteInput, update);
DocenteRouter.delete('/:id', remove);
//# sourceMappingURL=docenteroutes.js.map