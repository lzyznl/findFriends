import myAxios from "../plugin/myAxios";
import {showFailToast} from "vant";
import {getCurrentUSerStatus, setCurrentUserStatus} from "../status/userStatus";


export const getCurrentUser = async ()=>{
    return await myAxios.get('/user/current');
}