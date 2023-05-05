import {userType} from "../model/user";

let currentUser:userType;
const setCurrentUserStatus=(user:userType)=>{
    currentUser=user;
}
const getCurrentUSerStatus=()=>{
    return currentUser;
}

export {
    setCurrentUserStatus,
    getCurrentUSerStatus
}