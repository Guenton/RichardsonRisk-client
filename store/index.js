export const state = () => ({
  dark: false,
  user: {
    firstname: null,
    lastname: null
  }
});

export const getters = {
  getFullname(state) {
    return state.user.firstname + " " + state.user.lastname;
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
  }
};
