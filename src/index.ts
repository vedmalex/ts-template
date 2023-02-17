import { User } from '@DTO/User'
import { $contains } from './macro/contains'
const user = new User('Alex Vedmedenko', 'vedmalex[at]gmail[dot]com')
// macro sample
console.log(
  ` Hello world from ${user.userName}! mail me ${user.email} ${$contains!(
    'alex',
    ...['alex', 'feud', 'erwin'],
  )}`,
)
