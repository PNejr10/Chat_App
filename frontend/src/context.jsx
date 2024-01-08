
export let curUser = ''; 
export let uID = ''
export let user_secret = ''
export let User_Friends = []
export const projectID = '8f4ef2ab-e0c0-4b83-9cc6-669c0a2a3195'

export const setCurUser = (value) => {
    curUser = value;
};

export const setID = (value) => {
    uID = value;
};

export const setUser_secret = (value) => {
    user_secret = value;
};

export const Set_User_Friends = (value) => {
    User_Friends = value;
};