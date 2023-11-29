import RoleHasPermission from "../../models/RoleHasPermission.js";
import Roles from "../../models/Roles.js";
import UserAuth from "../../models/UserAuth.js";
import bcrypt from 'bcryptjs'
export const fetchUsers = async (req, res) => {
    try {

        let ifFindSingleUser = {}
        if (req.body.id) {
            ifFindSingleUser.id = req.body.id
        }
        const getUsers = await UserAuth.findAll({
            where: ifFindSingleUser,
            include: [
                { model: Roles, as: "UserRoles", attributes: ['id', 'name', 'guard_name'] },
            ],
            attributes: ['id', 'name', 'email', 'is_type', 'remember_token']
        })
        res.json(req.body.id ? getUsers[0] : getUsers)
    } catch (error) {
        res.send(error.message)
    }
}
export const createUser = async (req, res) => {
    let { id, name, email, password, is_type, remember_token, user_type } = req.body
    try {
        const checkEmailIsExist = await UserAuth.findOne({ where: { email: email } })

        if (checkEmailIsExist) {
            return res.json({
                status: false,
                response_code: 409,
                response_message: "This email is already registered!! ",
            });
        }
        let hashedPassword
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }

        const createUser = await UserAuth.create({
            id: id, name: name, email: email, password: hashedPassword, is_type: is_type, user_type: user_type, remember_token: remember_token
        })
        if (createUser) {
            return res.json({
                status: true,
                response_code: 200,
                response_message: "User created!! ",
                data: createUser
            });
        } else {
            return res.json({
                status: false,
                response_code: 500,
                response_message: "Error Occured!! ",
                data: createUser
            });
        }
    } catch (error) {
        return res.json({
            status: 500,
            response_code: 500,
            response_message: "Something went wrong!! ",
            data: createUser
        });
    }
}
export const createRole = async (req, res) => {
    let { name, guard_name } = req.body
    try {
        const role = await Roles.create({
            name: name,
            guard_name: guard_name
        })
        if (role) {
            return res.json({
                status: true,
                response_code: 200,
                response_message: "User created!! ",
                data: role
            });
        } else {
            return res.json({
                status: false,
                response_code: 500,
                response_message: "Error Occured!! ",
                data: role
            });
        }
    } catch (error) {

        return res.json({
            status: 500,
            response_code: 500,
            response_message: "Something went wrong!! ",
            // data: createUser
        });
    }

}
export const assingPermissionToRole = async (req, res) => {
    let { role_id, permission_id, delete_permission } = req.body
    try {
        if (permission_id) {
            // for (const iterator of JSON.parse(permission_id)) {
            for (const iterator of permission_id) {
                const findPermission = await RoleHasPermission.findOne({ where: { role_id: role_id, permission_id: iterator } })
                if (!findPermission) {
                    const createPermission = await RoleHasPermission.create({ role_id: role_id, permission_id: iterator })
                }
            }
        }
        if (delete_permission) {
            for (const iterator of JSON.parse(delete_permission)) {
                const deletePermission = await RoleHasPermission.destroy({
                    where: { role_id: role_id, permission_id: iterator.permission_id }
                })
            }
        }
        return res.json({
            status: true,
            response_code: 200,
            response_message: "Pemissions assing to role!! ",
        });
    } catch (error) {
        console.log('------->>', error.message)
        return res.json({
            status: 500,
            response_code: 500,
            response_message: "Something went wrong!! ",
            // data: createUser
        });
    }
}
export const testingRoutes = async (req, res) => {
    try {
        return res.json({
            status: true,
            response_code: 200,
            response_message: "You are insiede Web !!!!🚀🚀 ",
        });
    } catch (error) {
        console.log('------->>', error.message)
        return res.json({
            status: 500,
            response_code: 500,
            response_message: "Something went wrong!! ",
            // data: createUser
        });
    }
} 