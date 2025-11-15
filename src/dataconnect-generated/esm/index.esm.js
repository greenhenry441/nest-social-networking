import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'nest-social',
  location: 'us-east4'
};

export const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';

export function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
}

export const getPostsByAuthorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPostsByAuthor', inputVars);
}
getPostsByAuthorRef.operationName = 'GetPostsByAuthor';

export function getPostsByAuthor(dcOrVars, vars) {
  return executeQuery(getPostsByAuthorRef(dcOrVars, vars));
}

export const createCommentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateComment', inputVars);
}
createCommentRef.operationName = 'CreateComment';

export function createComment(dcOrVars, vars) {
  return executeMutation(createCommentRef(dcOrVars, vars));
}

export const getFriendshipsForUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetFriendshipsForUser');
}
getFriendshipsForUserRef.operationName = 'GetFriendshipsForUser';

export function getFriendshipsForUser(dc) {
  return executeQuery(getFriendshipsForUserRef(dc));
}

