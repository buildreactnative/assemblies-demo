import { isEqual, findIndex } from 'underscore';

export function rowHasChanged(r1, r2) {
  return r1 != r2;
}

export function isMember(group, currentUser){
  return findIndex(group.members, ({ userId }) => isEqual(userId, currentUser.id)) !== -1;
};

export function showJoinButton(users, currentUser){
  return findIndex(users, ({ id }) => isEqual(id, currentUser.id)) === -1;
}
