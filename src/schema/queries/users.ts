import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import { User } from "../../Entities/User";
import AppDataSource from '../../dataSource';
import { UserType } from '../types';

export const users = {
    type: GraphQLList(UserType),
    description: "get all users",

    resolve() {
        return AppDataSource.manager.find(User)
    }
}

export const user = {
    type: UserType,
    description: "get a user by id",
    args: {
        id: { type: GraphQLID }
    },
    async resolve(_: any, args: any) {
        const user = await AppDataSource.manager.findOneBy(User, { id: args.id })
        if (user) return user;
        throw new Error('user not found')
    }
}