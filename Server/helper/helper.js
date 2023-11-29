import { CatchErrors, ResponseSuccess, ResponseError } from '../ResponseMsg/ResponseMsg.js'
import config from '../config.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Client from 'ssh2-sftp-client'
import nodemailer from 'nodemailer'
import https from 'https'
const sftp = new Client()

const configsftp = {
    host: config.FTP_HOST,
    port: config.FTP_PORT,
    username: config.FTP_USERNAME,
    password: config.FTP_PASSWORD,
}
const SftpConnection = await sftp.connect(configsftp)



const Query = {
    find: "find",
    findOne: "findOne",
    deleteMany: "deleteMany",
    insertMany: "insertMany",
    deleteOne: "deleteOne",
    findById: "findById",
    create: "create",
    findByIdAndDelete: "findByIdAndDelete",
    findByIdAndUpdate: "findByIdAndUpdate",
    updateMany: "updateMany",
    updateOne: "updateOne",
    count: "count"
}

const HttpStatus = {
    Ok_Status: 200,
    Not_Found: 404,
    Forbidden: 403
}

const { find, findOne, deleteMany, deleteOne, findById, create, findByIdAndDelete, findByIdAndUpdate, updateMany, updateOne, count, insertMany } = Query
const { Ok_Status, Not_Found, Forbidden } = HttpStatus

const commonquery = async function (model, query, data = {}, update = {}, select = {}, sort = {}, limit = 0, page = 0, perpage = 0) {
    try {
        let Response
        let msg
        let status
        switch (query) {
            case find:
                Response = await model.find(data, select).sort(sort)
                if (Response.length > 0) {
                    status = true
                    msg = "Data Found Successfully.."
                }
                else {
                    status = false
                    msg = "Data Not Found"
                }
                break;
            case findOne:
                Response = await model.findOne(data, select).sort(sort)
                if (Response) {
                    status = true
                    msg = "Data Found Successfully.."
                }
                else {
                    status = false
                    msg = "Data Not Found"
                }
                break;
            case findByIdAndDelete:
                Response = await model.findByIdAndDelete(data)
                if (Response) {
                    status = true
                    msg = "Data Delete Successfully.."
                }
                else {
                    status = false
                    msg = "Error, please try again."
                }
                break;
            case findByIdAndUpdate:
                Response = await model.findByIdAndUpdate(data, update, { new: true })
                if (Response) {
                    status = true
                    msg = "Data Update Successfully.."
                }
                else {
                    status = false
                    msg = "Error, please try again."
                }
                break;
            case findById:

                break;
            case updateMany:

                break;
            case updateOne:

                break;
            case create:
                Response = await model.create(data)
                if (Response) {
                    status = true,
                        msg = "Save Data Successfully.."
                }
                else {
                    status = false
                    msg = "Error, please try again."
                }
                break;
            case insertMany:
                break;
            case deleteMany:
                Response = await model.deleteMany(data)
                if (Response) {
                    status = true
                    msg = "Data Delete Successfully.."
                }
                else {
                    status = false
                    msg = "Error, please try again."
                }
                break;
            case deleteOne:

                break;
            case count:
                Response = await model.find(data).count()
                status = true
                msg = "Data Count Successfully.."

                break;

            default:
                break;
        }

        if (status === true) {
            return await ResponseSuccess(Ok_Status, msg, Response)
        }
        else {
            return await ResponseError(Not_Found, msg)
        }

    }
    catch (error) {
        return await CatchErrors(Not_Found, error.message)
    }
}

const UploadImage = async function (file, path, imagename, oldfile = null) {
    try {
        var Extension = file.name.split(".")
        var Filename = imagename + "_" + Date.now() + "." + Extension[Extension.length - 1]
        var destinationPath = config.FTP_PATH + config.DO_SFTP_FOLDER + path + "/" + Filename
        if (SftpConnection) {
            const pathData = await sftp.put(file.data, destinationPath)
            const Uploadpath = config.DO_SFTP_BASE_URL + config.DO_SFTP_FOLDER + path + "/" + Filename
            return { status: true, path: Uploadpath, msg: "Upload Image Successfully.." }
        } else {
            sftp.end()
            console.log(err.message)
            return { status: false, msg: err.message }
        }
    } catch (error) {
        return await CatchErrors(Not_Found, error.message)
    }
}

const DeleteImage = async function (imagelink, path) {
    try {
        const Filename = imagelink.split("/")
        const destinationPath = config.FTP_PATH + config.DO_SFTP_FOLDER + path + "/" + Filename[Filename.length - 1]
        if (SftpConnection) {
            const pathData = await sftp.delete(destinationPath)
            return { status: true, msg: "Image Delete Successfully.." }
        } else {
            sftp.end()
            console.log(err.message)
            return { status: false, msg: err.message }
        }
    } catch (error) {
        return await CatchErrors(Not_Found, error.message)
    }
}

const CreateBcryptPassword = async function (password) {
    try {
        var hash_password = await bcrypt.hash(password, 10)
        return hash_password
    } catch (error) {
        return await CatchErrors(Not_Found, error.message)
    }
}

const CheckBcryptPassword = async function (password, hashpassword) {
    try {
        const CheckPassword = await bcrypt.compare(password, hashpassword)
        return CheckPassword
    } catch (error) {
        return await CatchErrors(Not_Found, error.message)
    }
}

const CreateJwtToken = async function (data) {
    try {
        var token = jwt.sign(data, config.JWT_SECRET)
        return token
    } catch (error) {
        return await CatchErrors(Not_Found, error.message)
    }
}

const VerifyJwtToken = async function (data) {
    try {
        var verif = jwt.verify(data, config.JWT_SECRET)
        return verif
    } catch (error) {
        return await CatchErrors(Not_Found, error.message)
    }
}

const SendMail = async function (user_email, subject, html) {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: config.Mail_Username,
                pass: config.Mail_Password
            }
        });

        const mailOptions = {
            from: config.Mail_Username,
            to: user_email,
            subject: subject,
            html: html
        }

        const Response = await transporter.sendMail(mailOptions)
        if (Response.accepted && Response.accepted.length !== 0) {
            return { Status: true }
        }
        else {
            return { Status: false }
        }

    } catch (error) {
        return await CatchErrors(Not_Found, error.message)
    }
}

const notificationFunc = async (api, errMsg) => {
    const myobj = {
        ios: 'https://apps.apple.com/us/app/yoga-workout-for-women/id1586973612'
    }

    const passData = {
        errorMessage: errMsg,
        type: JSON.stringify(myobj)
    }
    var message = {
        app_id: config.APP_ID,
        name: 'API is down',
        headings: { "en": `Saumya Yoga` },
        contents: { "en": `${api}` },
        included_segments: ["All"],
        small_icon: "https://is5-ssl.mzstatic.com/image/thumb/Purple116/v4/b8/aa/31/b8aa3191-c1e0-e150-720d-7826d1e57f6f/AppIcon-1x_U007emarketing-0-7-0-85-220.jpeg/230x0w.webp",
        large_icon: "https://is5-ssl.mzstatic.com/image/thumb/Purple116/v4/b8/aa/31/b8aa3191-c1e0-e150-720d-7826d1e57f6f/AppIcon-1x_U007emarketing-0-7-0-85-220.jpeg/230x0w.webp",
        big_picture: '',
        url: '',
        data: passData
    };
    console.log(message);

    const notify = await sendNotification(message)
}

const sendNotification = function (data) {
    var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Basic ${config.APP_KEY}`
    };

    var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
    };


    var req = https.request(options, function (res) {
        res.on('data', function (data) {
            console.log("Response:");
            console.log(JSON.parse(data));
        });
    });

    req.on('error', function (e) {
        console.log("ERROR:");
        console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
    return (data)
};

export { Query, HttpStatus, commonquery, UploadImage, DeleteImage, CreateBcryptPassword, CheckBcryptPassword, CreateJwtToken, VerifyJwtToken, SendMail, notificationFunc }