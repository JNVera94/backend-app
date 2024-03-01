import jwt from 'jsonwebtoken';
export function validarToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso no autorizado, token no proporcionado' });
    }
    const secretJWT = process.env.SECRETJWT || 'defaultSecret';
    console.log('este es el token', token);
    jwt.verify(token, secretJWT, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ mensaje: 'Token no válido' });
        }
        req.decodedToken = decodedToken;
        next();
    });
}
//# sourceMappingURL=interceptor.token.js.map