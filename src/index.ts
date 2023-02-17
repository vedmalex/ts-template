import { User } from '@DTO/User'
import { $contains } from './macro/contains'

if (!PROD) {
  const user = new User('Alex Vedmedenko', 'vedmalex[at]gmail[dot]com')
  // macro sample
  console.log(
    ` Hello world from DEV ${user.userName}! mail me ${user.email} ${$contains!(
      'alex',
      ...['alex', 'feud', 'erwin'],
    )}`,
  )
} else {
  const user = new User('Alex Vedmedenko', 'vedmalex[at]gmail[dot]com')
  // macro sample
  console.log(
    ` Hello world from PROD ${user.userName}! mail me ${
      user.email
    } ${$contains!('alex', ...['alex', 'feud', 'erwin'])}`,
  )
}
