import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();
import Express from 'express';
import { orm } from './shared/db/orm.js';
import cors from 'cors';
import { RequestContext } from '@mikro-orm/core';
import { ContactoRouter } from './Contacto/contactoroutes.js';
import { MateriaRouter } from './Materias/materiasroutes.js';
import { AlumnoRouter } from './Alumno/alumno.routes.js';
import { InscripcionRouter } from './Inscripciones/inscripcion.routes.js';
import { AuthRouter } from './User/user.routes.js';
const app = Express();
app.use(Express.json());
app.use(cors());
app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
});
app.use('/api/contacto', ContactoRouter);
app.use('/api/alumnos', AlumnoRouter);
app.use('/api/inscripcion', InscripcionRouter);
app.use('/api/materia', MateriaRouter);
app.use('/api/user', AuthRouter);
app.use((_, res) => {
    return res.status(404).send({ message: 'Resource not found' });
});
/*await syncSchema()*/
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/');
});
//# sourceMappingURL=app.js.map