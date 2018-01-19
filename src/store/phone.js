export default {
    namespaced: true,

    state: {
        user: null,
        gateway: null,
        needsWelcome: true,
        state: 'notAvailable',
    },

    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setGateway(state, gateway) {
            state.gateway = gateway;
        },
        seenWelcome(state) {
            state.needsWelcome = false;
        },
        needsWelcome(state) {
            state.needsWelcome = true;
        },
        takingIncomingCall(state) {
            state.state = 'takingIncomingCall';
        },
        available(state) {
            state.state = 'available';
        },
        notAvailable(state) {
            state.state = 'notAvailable';
        },
    },

    getters: {
        getState: state => state.state,
    },

    actions: {},
};