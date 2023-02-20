export class User {
  get fullName(): string {
    return `name: ${this.userName} email: ${this.email}`
  }
  constructor(public userName: string, public email: string) {
    console.log('done')
  }
}
