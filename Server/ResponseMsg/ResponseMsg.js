const CatchErrors = async function (response_code, message) {
   return ({ Status: false, Response_Code: response_code, Response_Message: message })
}
const ResponseError = async function (response_code, message) {
   return ({ Status: false, Response_Code: response_code, Response_Message: message })
}
const ResponseSuccess = async function (response_code, message, data) {
   return ({ Status: true, Response_Code: response_code, Response_Message: message, Data: data })
}
const ResponseWithTokenSuccess = async function (response_code, message, data, token) {
   return ({ Status: true, Response_Code: response_code, Response_Message: message, Data: data, token: token })
}
const ResponseSuccessmsg = async function (response_code, message) {
   return ({ Status: true, Response_Code: response_code, Response_Message: message })
}
const ResponseErrormsg = async function (response_code, message) {
   return ({ Status: false, Response_Code: response_code, Response_Message: message })
}
const ResponseSuccesscountmsg = async function (response_code, message, Stamp, Question) {
   return ({ Status: true, Response_Code: response_code, Response_Message: message, Stamps: Stamp, Questions: Question })
}

/* Api Response Msg */

const ResponseErrorApi = async function (message) {
   return ({ ResponseCode: 0, ResponseMessage: message })
}

const ResponseWithDataApi = async function (data = []) {
   return ({ ResponseCode: 1, ResponseMessage: "success", data: data })
}

const ResponseWithDataPagginationApi = async function (data = [], page = 0) {
   return ({ ResponseCode: 1, ResponseMessage: "success", data: data, total_page: page })
}

const ResponseWithTrueApi = async function () {
   return ({ ResponseCode: 1, ResponseMessage: "success", status: 'true' })
}

/* Convert Data Response */

const ResponseSuccessConvert = async function (message) {
   return ({ ResponseCode: 1, ResponseMessage: message })
}

/* End Change Data Response */


export {
   CatchErrors, ResponseError, ResponseSuccess, ResponseWithTokenSuccess, ResponseSuccessmsg, ResponseErrormsg, ResponseSuccesscountmsg,
   ResponseErrorApi, ResponseWithDataApi, ResponseWithDataPagginationApi, ResponseWithTrueApi,
   ResponseSuccessConvert
}

