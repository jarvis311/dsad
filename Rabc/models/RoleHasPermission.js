import {
    Model,
    DataTypes
} from "sequelize";
import db from '../config/database.js'
import UserPermission from "./Permission.js";

class RoleHasPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
}
RoleHasPermission.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    permission_id: {
        type: DataTypes.BIGINT,
    },
    role_id: {
        type: DataTypes.BIGINT,
    }
}, {
    sequelize: db.Vehicle,
    modelName: 'RoleHasPermission',
    tableName: 'role_has_permission_new',
    timestamps: false
});
export default RoleHasPermission;

RoleHasPermission.belongsTo(UserPermission, {
    as: 'UserHasPermission',
    foreignKey: "permission_id",
})

