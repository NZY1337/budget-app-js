class UserLogin {
    constructor() {
        this.myForm = document.getElementById('login-form');
        this.myFormEmail = this.myForm.elements['login-form-name'];
        this.myFormPassword = this.myForm.elements['login-form-password'];
        this.myFormSubmitBtn = this.myForm.elements['login-form-submit'];
        this.loggedPeople = [];
        
        console.log('build localStorage user login');
    }
    
    
    checkSubmit = (e) => {
        const userInfo = new Object();
            
        this.myForm.addEventListener('submit', ()=> {
            const userLoginPass = this.myFormPassword.value;
            const userLoginMail = this.myFormEmail.value;
            
            userInfo.userPass = userLoginPass;
            userInfo.userMail = userLoginMail;

           this.loggedPeople.push(userInfo, userInfo);
            
           console.table(this.loggedPeople);
        });
    }
    
    test  = () => {
        return '1111111'
    }
}
export default UserLogin;




