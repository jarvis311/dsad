import {
    Model,
    DataTypes
} from "sequelize";
import db from '../config/database.js'

class UserPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
}
UserPermission.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    display_name: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
    },
    guard_name: {
        type: DataTypes.STRING,
    },
    created_at: {
        type: DataTypes.DATE,
    },
    updated_at: {
        type: DataTypes.DATE,
    },
}, {
    sequelize: db.Vehicle,
    modelName: 'UserPermission',
    tableName: 'permissions',
    timestamps: false
});
export default UserPermission;



