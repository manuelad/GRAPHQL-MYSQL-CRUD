import { GraphQLID } from 'graphql';
import { GraphQLString } from 'graphql';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';


export const UserType = new GraphQLObjectType({
    name: "UserType",
    description: "User type",
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    }

})