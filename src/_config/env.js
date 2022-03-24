import { account } from "../_store/account.module";

let apiUrl;
let accessToken;


if(process.env.VUE_APP_MODE == "development") {
    apiUrl = process.env.VUE_APP_ROOT_API;
    accessToken = process.env.VUE_APP_TOKEN;
} else if(process.env.VUE_APP_MODE == "production") {
    apiUrl = "http://localhost:80";
    accessToken = account.state.accessToken;
    // apiUrl = "http://localhost:80";
    // accessToken = "dsfsdf";
}

const env = {apiUrl, accessToken }

export default env