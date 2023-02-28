(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.template = {}));
})(this, (function (exports) { 'use strict';

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

    exports.User = User;

}));
//# sourceMappingURL=index.browser.js.map
