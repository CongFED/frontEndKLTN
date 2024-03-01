const DOMAIN = "https://www.socialnetwork.somee.com";
// Đây là file chứa API server
const API = {

  LOGIN: DOMAIN + "/api/auth/login",
  REGISTER: DOMAIN + "/api/auth/register",
  VERIFY_PIN: DOMAIN + "/api/auth/VerifyPin",
  RESEND_MAIL: DOMAIN + "/api/auth/ReSendMail",
  ADD_INFO: DOMAIN + "/api/infor/create",
  GET_ALL_POST: DOMAIN + "/api/post",
  GET_ID_POST: DOMAIN + "/api/post/:id",
  POST_IMAGE: DOMAIN + "/api/post/upload",
  ADD_POST: DOMAIN + "/api/post",
  GET_INFO: DOMAIN + "/api/infor/user/:id",
  GET_MY_INFO: DOMAIN + "/api/infor/myinfor",
  POST_INFO: DOMAIN + "/api/infor/create",
  UPDATE_INFO: DOMAIN + "/api/infor/update",
  POST_COMMENT: DOMAIN + "/api/cmt/create",
  GET_ALL_FRIEND: DOMAIN + "/api/Friend/getAll",
  // POST_LIKE:DOMAIN + "api/like/{id}"
};
export default API;
