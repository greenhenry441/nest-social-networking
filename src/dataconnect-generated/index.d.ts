import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface ChatGroup_Key {
  id: UUIDString;
  __typename?: 'ChatGroup_Key';
}

export interface Comment_Key {
  id: UUIDString;
  __typename?: 'Comment_Key';
}

export interface CreateCommentData {
  comment_insert: Comment_Key;
}

export interface CreateCommentVariables {
  postId: UUIDString;
  content: string;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  username: string;
  email: string;
  passwordHash: string;
  role: string;
}

export interface Friendship_Key {
  initiatorId: UUIDString;
  recipientId: UUIDString;
  __typename?: 'Friendship_Key';
}

export interface GetFriendshipsForUserData {
  friendships: ({
    initiator: {
      id: UUIDString;
      username: string;
    } & User_Key;
      recipient: {
        id: UUIDString;
        username: string;
      } & User_Key;
        status: string;
        createdAt: TimestampString;
  })[];
}

export interface GetPostsByAuthorData {
  posts: ({
    id: UUIDString;
    content: string;
    createdAt: TimestampString;
  } & Post_Key)[];
}

export interface GetPostsByAuthorVariables {
  authorId: UUIDString;
}

export interface Message_Key {
  id: UUIDString;
  __typename?: 'Message_Key';
}

export interface Post_Key {
  id: UUIDString;
  __typename?: 'Post_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface GetPostsByAuthorRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPostsByAuthorVariables): QueryRef<GetPostsByAuthorData, GetPostsByAuthorVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPostsByAuthorVariables): QueryRef<GetPostsByAuthorData, GetPostsByAuthorVariables>;
  operationName: string;
}
export const getPostsByAuthorRef: GetPostsByAuthorRef;

export function getPostsByAuthor(vars: GetPostsByAuthorVariables): QueryPromise<GetPostsByAuthorData, GetPostsByAuthorVariables>;
export function getPostsByAuthor(dc: DataConnect, vars: GetPostsByAuthorVariables): QueryPromise<GetPostsByAuthorData, GetPostsByAuthorVariables>;

interface CreateCommentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCommentVariables): MutationRef<CreateCommentData, CreateCommentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCommentVariables): MutationRef<CreateCommentData, CreateCommentVariables>;
  operationName: string;
}
export const createCommentRef: CreateCommentRef;

export function createComment(vars: CreateCommentVariables): MutationPromise<CreateCommentData, CreateCommentVariables>;
export function createComment(dc: DataConnect, vars: CreateCommentVariables): MutationPromise<CreateCommentData, CreateCommentVariables>;

interface GetFriendshipsForUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetFriendshipsForUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetFriendshipsForUserData, undefined>;
  operationName: string;
}
export const getFriendshipsForUserRef: GetFriendshipsForUserRef;

export function getFriendshipsForUser(): QueryPromise<GetFriendshipsForUserData, undefined>;
export function getFriendshipsForUser(dc: DataConnect): QueryPromise<GetFriendshipsForUserData, undefined>;

