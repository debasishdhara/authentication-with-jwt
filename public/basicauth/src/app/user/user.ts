export interface User {
    name:String,
    email:String,
    phone:String,
    password:String,
    password_confirmation:string
}
export class Userdetails {
    name:String = '';
    email:String = '';
    phone:String = '';
    password:String = '';
    password_confirmation:string = '';
}