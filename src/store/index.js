import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { getCommuterRailStops, getStopSchedule } from '@/services/mbta-api-service';

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  key: 'state',
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    stops: [],
    selectedStopSchedule: [],
    selectedStopId: '',
  },
  mutations: {
    INITIALIZE_STORE(state) {
      if (localStorage.getItem('state')) {
        try {
          this.replaceState(
            Object.assign(state, JSON.parse(localStorage.getItem('state')))
          );
        } catch (error) {
          console.warn('%cError activating state!', 'color: red', error);
        }
      }
    },
    SET_COMMUTER_RAIL_STOPS(state, stops) {
      state.stops = stops;
    },
    SET_SELECTED_STOP_ID(state, stop) {
      state.selectedStopId = stop;
    },
    SET_SELECTED_STOP_SCHEDULE(state, schedule) {
      state.selectedStopSchedule = schedule;
    }
  },
  actions: {
    async loadCommuterRailStops({ commit, state }) {
      try {
        let stops = await getCommuterRailStops();
        if (state.selectedStopId === '')
          commit('SET_SELECTED_STOP_ID', stops[0].id);
        commit('SET_COMMUTER_RAIL_STOPS', stops);
      } catch (error) {
        console.log(error);
      }
    },
    async loadSelectedStopSchedule({ commit, state }) {
      try {
        let { data, included } = await getStopSchedule(state.selectedStopId);
        data = data.filter(e => !!e.attributes.departure_time).map(e => { 
          return {
            ...e,
            platform: included.find(e => e.type === 'stop').attributes.platform_code,
            destination: e.relationships.trip.data ? included.filter(e => e.type === 'trip').find(trip => trip.id === e.relationships.trip.data.id).attributes.headsign : null,
            status: e.relationships.prediction.data ? included.filter(e => e.type === 'prediction').find(prediction => prediction.id === e.relationships.prediction.data.id).attributes.status : null
          }
        });
        commit('SET_SELECTED_STOP_SCHEDULE', data);
      } catch (error) {
        console.log(error);
      }
    }
  },
  plugins: [vuexLocal.plugin]
});
