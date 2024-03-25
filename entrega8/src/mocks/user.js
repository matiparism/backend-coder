import faker from 'faker'

export function createUser() {

    const roles = ['admin', 'user', 'guest']

    const user = {
        id: faker.datatype.uuid(),
        name: faker.person.firstName(),
        email: faker.internet.email(),

        role: faker.random.arrayElement(roles)
    }

    return user
}
