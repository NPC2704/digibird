const DOMAIN = "https://test-pos.digibird.io/api/v1";
// Đây là file chứa API server
const API = {
  GET_ADDRESS:
    DOMAIN +
    "/front/self/address?fields=id,xid,name,email,phone,address,shipping_address,city,state,country",
  POST_ADDRESS: DOMAIN + "/front/self/address",
  PUT_ADDRESS: DOMAIN + "/front/self/address/",
  LOGIN_ADDRESS: DOMAIN + "/front/sign-up-zalo",
};
export default API;
