import dotenv from 'dotenv'
dotenv.config('.env')

export default {
    PORT: process.env.PORT,
    DB_CONECTION_URL: process.env.DB_CONECTION_URL,
    FTP_HOST: process.env.FTP_HOST,
    FTP_USERNAME: process.env.FTP_USERNAME,
    FTP_PORT: process.env.FTP_PORT,
    FTP_PASSWORD: process.env.FTP_PASSWORD,
    FTP_PATH: process.env.FTP_PATH,
    DO_SFTP_BASE_URL: process.env.DO_SFTP_BASE_URL,
    DO_SFTP_FOLDER: process.env.DO_SFTP_FOLDER,
    JWT_SECRET: process.env.JWT_SECRET,
    APP_URL: process.env.APP_URL,
    Mail_Username: process.env.Mail_Username,
    Mail_Password: process.env.Mail_Password,
    APP_KEY:process.env.APP_KEY,
    APP_ID:process.env.APP_ID
}