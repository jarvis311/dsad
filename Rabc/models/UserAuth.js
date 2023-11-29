import {
    Model,
    DataTypes
} from "sequelize";
import db from '../config/database.js'
import Roles from "./Roles.js";

class UserAuth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
}
UserAuth.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    is_type: {
        type: DataTypes.INTEGER,
    },
    user_type: {
        type: DataTypes.SMALLINT,
    },
    remember_token: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    created_at: {
        type: DataTypes.DATE,
    },
    updated_at: {
        type: DataTypes.DATE,
    }
}, {
    sequelize: db.Vehicle,
    modelName: 'UserAuth',
    tableName: 'users',
    timestamps: false
});

// UserAuth.hasOne(Roles, {
//     foreignKey: "user_type",
//     as: "UserRoles",
//     sourceKey: "id"
// })
UserAuth.belongsTo(Roles, {
    foreignKey: "user_type",
    as: "UserRoles"
})
export default UserAuth;