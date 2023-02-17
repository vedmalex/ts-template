import 'jest'
import { User } from '../dto/User'
describe('it must', () => {
  it('works', () => {
    expect('done').toBe('done')
  })
})

describe('user is created', () => {
  it('creates User', () => {
    const user = new User('Alex', 'vedmalex[at]gmail.com')
    expect(user).toMatchSnapshot('user')
  })
})
