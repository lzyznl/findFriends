import {userType} from "./user";


export type teamType={
    id:number;
    description:string;
    expireTime?:Date;
    maxNum:number;
    name:string;
    userId:number;
    password?:string;
    status:number;
    createTime:Date;
    updateTime:Date;
    userVO?:userType;
}