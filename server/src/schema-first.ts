import { ApolloServer, gql } from 'apollo-server';
import { addUser, addUserResultResolveType, getAge, users } from './data';

const typeDefs = gql`

  type User {
    id: ID!
    name: String!
    age: Int!
  }

  type Query {
    users: [User!]!
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
    users: () => users,
  },
  User: {
    age: getAge,
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

  },
);

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
