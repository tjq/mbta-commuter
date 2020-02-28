<template>
  <v-data-table
    :headers="headers"
    :items="schedule"
    :items-per-page="10"
    class="elevation-1"
  >
    <template v-slot:item.departure_time="{ item }">
      {{ item.attributes.departure_time | time }}
    </template>
    <template v-slot:item.destination="{ item }">
      {{ item.destination}}
    </template>
    <template v-slot:item.train="{ item }">
      {{ item.relationships.trip.data.id.split('-')[item.relationships.trip.data.id.split('-').length - 1] }}
    </template>
    <template v-slot:item.platform="{ item }">
      {{ !!item.platform ? item.platform : 'TBD'}}
    </template>
    <template v-slot:item.status="{ item }">
      {{ !!item.status ? item.status : 'TBD' }}
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    schedule: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      headers: [
        {
          text: 'Time',
          align: 'start',
          sortable: true,
          value: 'departure_time'
        },
        {
          text: 'Destination',
          align: 'start',
          sortable: true,
          value: 'destination'
        },
        {
          text: 'Train #',
          align: 'start',
          sortable: false,
          value: 'train'
        },
        {
          text: 'Track #',
          align: 'start',
          sortable: false,
          value: 'platform'
        },
        {
          text: 'Status',
          align: 'start',
          sortable: false,
          value: 'status'
        }
      ]
    };
  },
  filters: {
    time(val) {
      let timeComponents = val.split('T')[1].split(':').splice(0, 2);
      let hours = parseInt(timeComponents[0]);
      let suffix = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      if (hours === 0)
        hours += 12;
      return `${hours}:${timeComponents[1]} ${suffix}`;
    }
  }
}
</script>