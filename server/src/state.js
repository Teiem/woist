import { users } from './userData.js';

const userState = users
    .map((user, id) => ({ id, ...user, active: false }))

let currentInfo = "";

export const getActiveUsers = () => userState
    .filter(({ active }) => active)
    .map(({ name, stg, showName }) => showName
        ? { name, stg }
        : { stg }
    );

const getUserById = userID => {
    const user = userState.find(({ id }) => userID === id);

    if (user) return user;

    console.warn(`no user with id ${ id } found, using unknownUser`);
    return userState[0];
}

const getUserByNFC = nfc => {
    const user = userState.find(user => user.nfc === nfc);

    if (user) return user;

    console.warn(`no user with nfc ${ nfc } found, using unknownUser`);
    return userState[0];
}

export const setActiveUser = userID => {
    const user = getUserById(userID);
    user.active = true;
}

export const setInactiveUser = userID => {
    const user = getUserById(userID);
    user.active = false;
}

export const setActiveNFC = nfc => {
    const user = getUserByNFC(nfc);
    user.active = true;
}

export const setInactiveNFC = nfc => {
    const user = getUserByNFC(nfc);
    user.active = false;
}

export const getState = () => userState;

export const getCurrentInfo = () => currentInfo;
export const setCurrentInfo = info => currentInfo = info;