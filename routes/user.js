class User {
    constructor(name, password) {
        this.username = name;
        this.password = password;
    }

    static auth(name, pass) {
        var authUser = undefined;
        User.instances.filter(user => {
            if (user.username == name && user.password == pass) {
                console.log(user.username, user.password)
                console.log(user)
                authUser = user;
            }
        })

        return authUser;
    }
}

if (!User.instances)
    User.instances = [];

module.exports = User;