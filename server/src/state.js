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

const getUserById = userID => userState.find(({ id }) => userID === id);

export const setActiveUser = userID => {
    const user = getUserById(userID);
    user.active = true;
}

export const setInactiveUser = userID => {
    const user = getUserById(userID);
    user.active = false;
}

export const getState = () => userState;

export const getCurrentInfo = () => currentInfo;
export const setCurrentInfo = info => currentInfo = info;