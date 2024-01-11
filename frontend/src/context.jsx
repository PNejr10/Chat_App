
export let curUser = ''; 
export let uID = ''
export let user_secret = ''
export let User_Friends = []
// Note the Project ID and Private Key has to be update every 14 days
// because the free trial for a project in ChatEngine ends every two weeks
// if it is not a free trial then ignore this
export const projectID = 'Add ProjectID for ChatEngine'
export const privateKey =   'Add Private Key for ChatEngine'

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