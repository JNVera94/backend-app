import { orm } from '../shared/db/orm.js';
import { User } from '../User/user.entity.js';
import jwt from 'jsonwebtoken';
export async function authenticate(req, res) {
    const { email, password } = req.body;
    const em = orm.em;
    // Find user by email
    const user = await em.findOne(User, { email });
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }
    if (!(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    // Generate a token
    const token = jwt.sign({ userId: user.id }, 'secreto', { expiresIn: '1h' });
    console.log(`User ${user.email} logged in successfully.`);
    res.json({ token });
}
//# sourceMappingURL=auth.controller.js.map