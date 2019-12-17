export const state = () => ({
  dark: false,
  user: {
    firstname: null,
    lastname: null
  },
  err: null
});

export const getters = {
  getFullname(state) {
    return state.user.firstname + " " + state.user.lastname;
  },
  hasErr(state) {
    if (state.err) return true;
    else return false;
  }
};

export const mutations = {
  swapTheme(state) {
    state.dark = !state.dark;
  },
  changeFirstname(state, firstname) {
    state.user.firstname = firstname;
  },
  changeLastname(state, lastname) {
    state.user.lastname = lastname;
  },
  setErr(state, err) {
    state.err = err;
  },
  clearErr(state) {
    state.err = null;
  }
};
