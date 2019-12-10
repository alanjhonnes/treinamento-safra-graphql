import moment from 'moment';
import { byId, byIds } from './helpers';

export interface User {
    id: number;
    name: string;
    birthdate: string;
    friendIds: number[];
}

export type UserInput = Pick<User, 'name' | 'birthdate'>;

export interface Post {
    id: number;
    content: string;
    userId: number;
}

export interface Comment {
    id: number;
    comment: string;
    userId: number;
}

export interface AddUserError {
    error: string;
}

export const users: User[] = [
    {
        id: 1,
        name: 'Alan Jhonnes',
        birthdate: '1990-03-13',
        friendIds: [2],
    },
    {
        id: 2,
        name: 'Kono',
        birthdate: '1980-03-13',
        friendIds: [1],
    },
];

export const posts: Post[] = [
    {
        id: 1,
        content: 'JK Rowling',
        userId: 1,
    },
    {
        id: 2,
        content: 'Alan Jhonnes',
        userId: 2,
    },
];

export const comments: Comment[] = [
    {
        id: 1,
        comment: 'Top',
        userId: 1,
    },
    {
        id: 2,
        comment: 'Yep',
        userId: 2,
    },
];

export async function getUser(id: number) {
    console.log(`getting user ${id}`);
    return users.find(byId(id));
}

export async function getUsers(ids: number[]) {
    console.log(`getting users ${ids}`);
    return users.filter(byIds(ids));
}

export async function getPost(id: number) {
    console.log(`getting post ${id}`);
    return posts.find(byId(id));
}

export async function getPosts(ids: number[]) {
    console.log(`getting posts ${ids}`);
    return posts.filter(byIds(ids));
}

export function getAge(user: User) {
    return moment().diff(moment(user.birthdate), 'years');
}

export type AddUserResult = User | AddUserError;

export function addUser(obj: any, args: { user: UserInput }): AddUserResult {
    if (args.user.name.includes('error')) {
        return {
            error: 'Erro adicionando usuário.',
        };
    }
    const newId = users.length;
    const newUser = {
        ...args.user,
        id: newId,
        friendIds: [],
    };
    users.push(newUser);
    return newUser;
}

export function addUserResultResolveType(obj: AddUserResult) {
    if ('error' in obj) {
        return 'AddUserError';
    }
    return 'User';
}
