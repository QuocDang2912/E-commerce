import axios from "axios";
import { AppUrl } from "./AppUrl";
import store from "../state/Store";


let token = store.getState().user.token

const configInstance = {

    baseURL: `${AppUrl.BaseURL}`,
    headers: {
        // 'Authorization': `Bearer ${AppUrl.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

if (token !== '') {
    configInstance.headers['Authorization'] = `Bearer ${token}`;
}
store.subscribe(() => {
    // store.subscribe lắng nghe store thay đổi thì thực hiện
    const newToken = store.getState().user.token;
    axiosInstance.defaults.headers['Authorization'] = newToken ? `Bearer ${newToken}` : null;
})

const axiosInstance = axios.create(configInstance);
export default axiosInstance
