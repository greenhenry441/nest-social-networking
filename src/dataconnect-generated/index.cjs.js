const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'nest-social',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
};

const getPostsByAuthorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPostsByAuthor', inputVars);
}
getPostsByAuthorRef.operationName = 'GetPostsByAuthor';
exports.getPostsByAuthorRef = getPostsByAuthorRef;

exports.getPostsByAuthor = function getPostsByAuthor(dcOrVars, vars) {
  return executeQuery(getPostsByAuthorRef(dcOrVars, vars));
};

const createCommentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateComment', inputVars);
}
createCommentRef.operationName = 'CreateComment';
exports.createCommentRef = createCommentRef;

exports.createComment = function createComment(dcOrVars, vars) {
  return executeMutation(createCommentRef(dcOrVars, vars));
};

const getFriendshipsForUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetFriendshipsForUser');
}
getFriendshipsForUserRef.operationName = 'GetFriendshipsForUser';
exports.getFriendshipsForUserRef = getFriendshipsForUserRef;

exports.getFriendshipsForUser = function getFriendshipsForUser(dc) {
  return executeQuery(getFriendshipsForUserRef(dc));
};
