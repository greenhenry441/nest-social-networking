import { CreateUserData, CreateUserVariables, GetPostsByAuthorData, GetPostsByAuthorVariables, CreateCommentData, CreateCommentVariables, GetFriendshipsForUserData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useGetPostsByAuthor(vars: GetPostsByAuthorVariables, options?: useDataConnectQueryOptions<GetPostsByAuthorData>): UseDataConnectQueryResult<GetPostsByAuthorData, GetPostsByAuthorVariables>;
export function useGetPostsByAuthor(dc: DataConnect, vars: GetPostsByAuthorVariables, options?: useDataConnectQueryOptions<GetPostsByAuthorData>): UseDataConnectQueryResult<GetPostsByAuthorData, GetPostsByAuthorVariables>;

export function useCreateComment(options?: useDataConnectMutationOptions<CreateCommentData, FirebaseError, CreateCommentVariables>): UseDataConnectMutationResult<CreateCommentData, CreateCommentVariables>;
export function useCreateComment(dc: DataConnect, options?: useDataConnectMutationOptions<CreateCommentData, FirebaseError, CreateCommentVariables>): UseDataConnectMutationResult<CreateCommentData, CreateCommentVariables>;

export function useGetFriendshipsForUser(options?: useDataConnectQueryOptions<GetFriendshipsForUserData>): UseDataConnectQueryResult<GetFriendshipsForUserData, undefined>;
export function useGetFriendshipsForUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetFriendshipsForUserData>): UseDataConnectQueryResult<GetFriendshipsForUserData, undefined>;
