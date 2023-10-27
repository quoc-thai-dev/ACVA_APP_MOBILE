//university
export const universitiesSelector = (state) => (state.universitiesReducer);

//auth
export const isLoginSelector = (state) => (state.auth.isLogin);
export const authSelector = (state) => (state.auth);
export const registerSelector = (state) => (state.auth.register);

//exam

export const examSelector = (state) => (state.examReducer);