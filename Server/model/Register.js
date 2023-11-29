import mongoose from "mongoose";
import { CreateJwtToken } from "../helper/helper.js";

const RegisterSchema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
}, { timestamps: true })

RegisterSchema.methods.gettoken = async function () {
    const token = await CreateJwtToken({ _id: this._id })
    this.tokens = this.tokens.concat({ token: token })
    await this.save()
    return token
}


const RegisterAdminPanel = mongoose.model('Register', RegisterSchema)
export default RegisterAdminPanel