import LocalStorageUserLogin from './localstorageUserLogin.js';

export class LocalStorageUsers extends LocalStorageUserLogin {
    constructor() {
        super ();
    }
}



const userLocal = new LocalStorageUsers;
console.log(userLocal.test());