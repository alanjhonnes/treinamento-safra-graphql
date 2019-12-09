import { ApolloServer } from 'apollo-server';
import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLUnionType } from 'graphql';
import { addUser, addUserResultResolveType, getAge, User, users } from './data';

export const userType = new GraphQLObjectType<User>({
    name: 'User',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        age: {
            type: new GraphQLNonNull(GraphQLInt),
            resolve: getAge,
        },
    },
});

export const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        users: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(userType))),
            resolve: () => users,
        },
    },
});

export const addUserErrorType = new GraphQLObjectType({
    name: 'AddUserError',
    fields: {
        error: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
});

export const addUserResultUnionType = new GraphQLUnionType({
    name: 'AddUserResult',
    types: [
        userType,
        addUserErrorType,
    ],
    resolveType: addUserResultResolveType,
});

export const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: new GraphQLNonNull(userType),
            resolve: addUser as any,
        },
    },
});

const server = new ApolloServer(
    {
        schema: new GraphQLSchema({
            query: queryType,
            mutation: mutationType,
        }),
    },
);

// The `listen` method launches a web server.
server.listen({
    port: 4001,
}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
