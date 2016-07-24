import { isEqual, findIndex } from 'underscore';

export function rowHasChanged(r1, r2) {
  return r1 != r2;
};

export function sectionHeaderHasChanged(s1, s2){
  return s1 != s2;
};

export function getSectionData(dataBlob, sectionID) {
  return dataBlob[sectionID]
};

export function getRowData(dataBlob, sectionID, rowID){
  return dataBlob[`${sectionID}:${rowID}`];
}

export function isMember(group, currentUser){
  return findIndex(group.members, ({ userId }) => isEqual(userId, currentUser.id)) !== -1;
};

export function showJoinButton(users, currentUser){
  return findIndex(users, ({ id }) => isEqual(id, currentUser.id)) === -1;
}
