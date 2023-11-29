import UserPermission from "../../models/Permission.js"


export const createPermission = async (req, res) => {
    let { display_name, name, guard_name } = req.body
    try {

        const permission = await UserPermission.findOrCreate({
            where: { display_name: display_name, name: name },
            defaults: { guard_name: guard_name },
        })
        if (permission[1]) {
            return res.json({
                status: true,
                response_code: 200,
                response_message: "Permission create successfully!!! ",
            });
        } else {
            return res.json({
                status: true,
                response_code: 200,
                response_message: "Permission is Already Exist!!! ",
            });
        }
    } catch (error) {
        return res.json({
            status: false,
            response_code: 500,
            response_message: "Something went wrong !!! " + error.message,
        });
    }
}