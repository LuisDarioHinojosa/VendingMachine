class HandleLogin {
    constructor(){
        this.authenticated = false;
        this.user = [];
    }

    login(user,cb){
        this.authenticated = true;
        this.user = user;
        cb();
    }

    logout(cb){
        this.authenticated = false;
        this.user = [];
        cb();
    }

    isAunthenticated(){
        return this.authenticated;
    }

    getUser(){
        return this.user;
    }
}

export default new HandleLogin();