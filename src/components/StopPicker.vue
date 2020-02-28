<template>
  <div class="">
    <div v-if="loading"> Loading... </div>
    <v-autocomplete
      outlined
      dense
      :items="stops"
      :loading="loading"
      item-text="id"
      :value="selectedStopId"
      @input="handleChange"
    >
    </v-autocomplete>
  </div>
</template>

<script>
export default {
  name: 'StopPicker',
  props: {
    stops: {
      type: Array,
      required: true,
      default: () => []
    },
    selectedStopId: {
      type: String,
      required: true,
      default: '',
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  methods: {
    handleChange(stopId) {
      this.$emit('on-stop-changed', stopId)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
