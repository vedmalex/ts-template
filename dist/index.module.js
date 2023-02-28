class User {
    get fullName() {
        return `name: ${this.userName} email: ${this.email}`;
    }
    constructor(userName, email) {
        this.userName = userName;
        this.email = email;
        console.log('done');
    }
}

{
    const user = new User('Alex Vedmedenko', 'vedmalex[at]gmail[dot]com');
    console.log(` Hello world from DEV ${user.userName}! mail me ${user.email} ${true}`);
}

export { User };
//# sourceMappingURL=index.module.js.map
