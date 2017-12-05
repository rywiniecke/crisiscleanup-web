import Vue from 'vue';

export default {
  state: {
    eventId: 60,
    currentSiteId: 1,
    currentUserId: 0,
    currentOrgId: 0,
    siteData: {},
    mapViewingArea: {},
    worksites: [],
    worksiteStats: {
      worksitesCompleted: 0,
      worksitesOpenUnassigned: 0,
      worksitesAssigned: 0
    }
  },

  mutations: {
    setEvent (state, payload) {
      state.eventId = payload;
    },
    setCurrentUserId (state, payload) {
      state.currentUserId = payload;
    },
    setCurrentOrgId (state, payload) {
      state.currentOrgId = payload;
    },
    setCurrentSiteId (state, payload) {
      state.currentSiteId = payload;
    },
    setCurrentSiteData (state, payload) {
      state.siteData = payload;
    },
    setMapViewingArea (state, payload) {
      state.mapViewingArea = payload;
    },
    setClaimInfo (state, payload) {
    },
    setWorksites (state, payload) {
      state.worksites = payload;
    },
    setWorksiteStats (state, payload) {
      state.worksiteStats.worksitesCompleted = payload.find(x => x.status === 'Closed, completed')
    }
  },

  getters: {
    getCurrentSiteId: state => state.currentSiteId,
    getCurrentSiteData: state => state.siteData,
    getCurrentOrgId: state => state.currentOrgId,
    isCurrentSiteClaimed: state => state.siteData.claimed_by !== null,
    isCurrentSiteClaimedByUserOrg: state => state.currentOrgId === state.siteData.claimed_by,
    getWorksites: state => state.worksites,
    getWorksiteStats: states => state.worksiteStats
  },

  actions: {
    getSite({ commit, state }, siteId) {
      Vue.http.get(`/worksites/${siteId}`).then(resp => {
        commit('setCurrentSiteData', resp.data);
        commit('setCurrentSiteId', resp.data.id);
      });
    },
    claimSite({commit, state}) {
      const claim = {
        // claimed_by: state.currentOrgId,
        user: state.currentUserId
      };
      Vue.http.patch(`/worksites/${state.currentSiteId}`, claim).then(resp => {
        commit('setCurrentSiteData', resp.data);
      });
    },
    getWorksites({ commit, state }) {
      Vue.http.get(`/worksites`).then((response) => {
        commit('setWorksites', response.data.results)
      }, (error) => {
      });
    },
    saveSite({commit, state}) {
      Vue.http.patch(`/worksites/${state.currentSiteId}`, state.siteData).then(resp => {
        commit('setCurrentSiteData', resp.data);
      });
    },
    getWorksiteStats({commit, state}) {
      Vue.http.get('/worksites/stats/statuses').then(resp => {
        commit('setWorksiteStats', resp.data.results)
      });
    }
  }
};
