<template>
  <div class="stops">
    <v-row 
      align="center"
      justify="center"
    >
      <v-col cols="12" align="center">
        {{ weekdays[date.getDay()] }} <br>
        {{ pad(date.getMonth() + 1) }}–{{ pad(date.toString().split(' ')[2]) }}–{{ date.getYear() + 1900 }} <br>
        {{ date | time }}
      </v-col>
    </v-row>
    <v-row 
      align="center"
      justify="center"
    >
      <StopPicker 
        :stops="stops"
        :loading="isStopPickerLoading"
        :selected-stop-id="selectedStopId"
        @on-stop-changed="handleStopChanged"
      />
    </v-row>
    <v-row
      align="center"
      justify="center"
    >
      <ScheduleTable
        :schedule="selectedStopSchedule"
        :loading="isScheduleLoading"
      />
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';

const StopPicker = () => ({
  component: import(/* webpackChunkName: "stop-picker" */'@/components/StopPicker')
});

const ScheduleTable = () => ({
  component: import(/* webpackChunkName: "schedule-table" */'@/components/ScheduleTable')
});

export default {
  name: 'Stops',
  components: {
    StopPicker,
    ScheduleTable
  },
  data() {
    return {
      isScheduleLoading: false,
      isStopPickerLoading: false,
      date: new Date(),
      weekdays: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
    };
  },
  computed: {
    ...mapState({
      stops: state => state.stops,
      selectedStopSchedule: state => state.selectedStopSchedule
    }),
    selectedStopId: {
      get() {
        return this.$store.state.selectedStopId
      },
      set(val) {
        this.$store.commit('SET_SELECTED_STOP_ID', val);
      }
    }
  },
  beforeCreate() {
    this.$store.dispatch('loadCommuterRailStops').then(() => {
      this.isStopPickerLoading = false;
      this.$store.dispatch('loadSelectedStopSchedule');
    });
    setInterval(() => {
      this.$store.dispatch('loadSelectedStopSchedule');
      this.date = new Date();
    }, 30000)
  },
  methods: {
    async handleStopChanged(stop) {
      this.selectedStopId = stop;
      await this.$store.dispatch('loadSelectedStopSchedule');
    },
    pad(str) {
      if (typeof str !== 'string')
        str = str.toString();
      return str.length === 1 ? `0${str}` : str;
    }
  },
  filters: {
    time(val) {
      let suffix = val.getHours() >= 12 ? 'PM' : 'AM'
      let hours = val.getHours() % 12;
      if (hours === 0)
        hours += 12;
      let minutes = val.getMinutes().toString().length === 1 ? `0${val.getMinutes()}` : val.getMinutes();
      return `${hours}:${minutes} ${suffix}`;
    }
  }
}
</script>
