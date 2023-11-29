import jwt from 'jsonwebtoken'
import UserAuth from '../models/UserAuth.js';

export const verifyToken = async (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({
            auth: false, message: 'No token provided.'
        });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(500).send({
                auth: false,
                message: 'Fail to Authentication. Error -> ' + err
            });
        }
        if (decoded) {
            const userId = (typeof decoded === 'object') ? decoded : JSON?.parse(decoded.payload);
            let findUser = await UserAuth.findByPk(JSON.parse(userId?.payload).id, { attributes: ['remember_token'] });
            if (findUser) {
                if (findUser.dataValues.remember_token == token) {
                    req.user = decoded;
                    next();
                }
            } else {
                return res.status(500).send({
                    auth: false,
                    message: 'Invalid Token, Try again-1 !!'
                });
            }
        } else {
            return res.status(500).send({
                auth: false,
                message: 'Invalid Token, Try again-2 !!'
            });
        }

    });
}