class m {
  get fullName() {
    return `name: ${this.userName} email: ${this.email}`;
  }
  constructor(l, o) {
    this.userName = l, this.email = o, console.log("done");
  }
}
{
  const e = new m("Alex Vedmedenko", "vedmalex[at]gmail[dot]com");
  console.log(` Hello world from true ${e.userName}! mail me ${e.email} ${!0}`);
}
export {
  m as User
};
//# sourceMappingURL=index.mjs.map
