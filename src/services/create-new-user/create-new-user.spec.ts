import { PostNock } from '../../../tests/nock'
import { createNewUser } from './create-new-user';


describe('UsersProvider', () => {
  it("should post sucessfully", async () => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '+55 19 9832042961',
      country: 'br',
      age: 22,
    }

    new PostNock().success(user, '/users');

    await expect(createNewUser({...user})).resolves.not.toThrow()
  })
})