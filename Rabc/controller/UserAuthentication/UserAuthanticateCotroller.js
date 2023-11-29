import UserPermission from "../../models/Permission.js";
import RoleHasPermission from "../../models/RoleHasPermission.js";
import Roles from "../../models/Roles.js";
import UserAuth from "../../models/UserAuth.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



export const userSignIn = async (req, res) => {
    let { email, password } = req.body
    try {
        if (email) {
            const checkEmailIsRegistred = await UserAuth.findOne({ where: { email: email } })
            if (!checkEmailIsRegistred) {
                return res.json({
                    status: false,
                    response_code: 404,
                    response_message: "This email not registred!! ",
                });
            } else {
                const matchPassword = await bcrypt.compare(password, checkEmailIsRegistred.dataValues.password);
                if (matchPassword) {
                    delete checkEmailIsRegistred.dataValues.remember_token
                    delete checkEmailIsRegistred.dataValues.password

                    const refreshToken = jwt.sign({ payload: JSON.stringify(checkEmailIsRegistred) }, process.env.TOKEN_SECRET, { expiresIn: "24h" },)

                    checkEmailIsRegistred.dataValues.token = refreshToken
                    try {
                        const updateUserRefreshToken = await UserAuth.update({ remember_token: refreshToken }, { where: { id: checkEmailIsRegistred.dataValues.id } })

                        const findUserPermission = await RoleHasPermission.findAll({
                            where: { role_id: checkEmailIsRegistred.dataValues.user_type },
                            include: [
                                {
                                    model: UserPermission,
                                    as: "UserHasPermission",
                                    attributes: ['id', 'display_name', 'name']
                                }
                            ]
                        })
                        if (findUserPermission) {
                            checkEmailIsRegistred.dataValues.userPermission = findUserPermission
                        }
                        if (updateUserRefreshToken) {
                            return res.json({
                                status: true,
                                response_code: 200,
                                response_message: "This User Login succesfully!! ",
                                data: checkEmailIsRegistred
                            });
                        } else {
                            return res.json({
                                status: false,
                                response_code: 500,
                                response_message: "Token not updated!! ",
                                // data: checkEmailIsRegistred
                            });
                        }
                    } catch (error) {
                        return res.json({
                            status: false,
                            response_code: 500,
                            response_message: error.message,
                            // data: checkEmailIsRegistred
                        });
                    }
                } else {
                    return res.json({
                        status: 401,
                        response_code: 401,
                        response_message: "Email or password not match! Try Again!! ",
                    });
                }
            }
        }
    } catch (error) {
        return res.json({
            status: 500,
            response_code: 500,
            response_message: "Something went wrong!!! ",
        });
    }
}