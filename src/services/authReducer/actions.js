export const LOGINUSER = 'LOGINUSER';

export const loginUser = (auth, user) => ({
  type: LOGINUSER,
  payload: { auth:auth, user:user },//todas as informações que passa para o reducer
});

export const logoutUser = () => ({
  type: LOGINUSER,
  payload: { auth:null, user:null },//todas as informações que passa para o reducer
});

