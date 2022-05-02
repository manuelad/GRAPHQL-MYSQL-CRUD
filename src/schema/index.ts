import { createUser, deleteUser, updateUser } from './mutations/users';
import { users, user } from './queries/users';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';

const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        users,
        user
    }
})

const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        createUser,
        deleteUser,
        updateUser
    }
})

export const schema = new GraphQLSchema({
    query: rootQuery,
    mutation
})