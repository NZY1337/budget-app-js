class UserExperience {
    constructor(btn, formWrapper) {
        this.btnUserLoginShow = document.getElementById(`${btn}`);
        this.form = document.getElementById(`${formWrapper}`);
    }
    
    toggleLogginForm = () => {
       const self = this;
        this.btnUserLoginShow.addEventListener('click', () => {
            this.form.classList.add('shown');
        });
    }
}



function loadClassUX() {
    const myUserExp = new UserExperience('btn-user-login', 'login-form-wrapper');
    myUserExp.toggleLogginForm();
}

document.addEventListener('DOMContentLoaded', function(){
    loadClassUX();
});