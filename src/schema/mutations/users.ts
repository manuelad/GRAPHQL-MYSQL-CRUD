import { User } from "../../Entities/User";
import { GraphQLID, GraphQLString } from "graphql";
import AppDataSource from "../../dataSource";
import { UserType } from "../types";
import bcrypt from 'bcryptjs';
import { resolve } from "path";

export const createUser = {
  type: UserType,
  description: "create new user",
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve(_: any, args: any) {
    const password = bcrypt.hashSync(args.password, 10);
    const manager = AppDataSource.manager;
    const user = manager.create(User, { ...args, password });
    return manager.save(User, user);
  },
};

export const deleteUser = {
  type: GraphQLString,
  description: "delete user by id",
  args: {
    id: { type: GraphQLID }
  },
  async resolve(_: any, args: any) {
    const manager = AppDataSource.manager;
    const resultDelete = await manager.delete(User, args.id)
    if (resultDelete.affected)
      return 'user delete'
    return 'can\'t delete user'
  }
}

export const updateUser = {
  type: GraphQLString,
  description: "update a user",
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    oldpassword: { type: GraphQLString },
    newpassword: { type: GraphQLString }

  },

  async resolve(_: any, args: any) {
    const manager = AppDataSource.manager;
    const userFound = await manager.findOneBy(User, { id: args.id })
    let match;
    if (userFound) {
      match = await bcrypt.compare(args.oldpassword, userFound.password)
      if (match) {
        const result = await manager.update(User, args.id, { password: bcrypt.hashSync(args.newpassword, 10), username: args.username, name: args.name })
        if (result.affected)
          return "user update"
        return "can't update user"
      }
      else
        return "password don't match"

    }
    return "user not found"

  }
}
