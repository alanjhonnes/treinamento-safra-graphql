import { ApolloServer, gql } from 'apollo-server';
import { addUser, addUserResultResolveType, getAge, users, getUsers, User } from './data';

const typeDefs = gql`

  type User {
    id: ID!
    name: String!
    age: Int!
    friendIds: [Int!]! 
    friends: [User!]!
  }

  type Query {
    users: [User!]!
    context: String!
  }

  type Mutation {
    addUser(user: UserInput!): AddUserResult
  }

  input UserInput {
    name: String!
    birthdate: String!
  }

  type AddUserError {
    error: String!
  }

  union AddUserResult = User | AddUserError
`;

const resolvers = {
  Query: {
    users: (obj: any, args: any, context: any) => {
        if(context.viewer.roles !== "Admin") {
            throw new Error("Not authorized");
        }
    },
    context: (obj: any, args: any, context: any) => {
        return JSON.stringify(context);
    }
  },
  User: {
    age: getAge,
    friends: (user: User) => getUsers(user.friendIds)
  },
  Mutation: {
    addUser: addUser,
  },

  AddUserResult: {
    __resolveType: addUserResultResolveType,
  },
};

const server = new ApolloServer(
  {
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: () => ({
        viewer: {
            name: 'User',
        }
    })
  },
);

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
