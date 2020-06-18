import localStorageUsersRegisteredUsers from './UserLogin.js';

export class LocalStorageUsers extends LocalStorageUserLogin {
    constructor() {
        super ();
    }
}


const userLocal = new LocalStorageUsers;
