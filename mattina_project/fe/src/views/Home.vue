<template>
      <div className="home" style="height: 100%;">
      <FlightSearch></FlightSearch>
  </div>
</template>

<script>
import FlightSearch from '../components/FlightSearch'

export default {
  name: 'Home',
  components: { FlightSearch }
}
</script>
<style scoped>
    ::-webkit-scrollbar {
        display: none !important;
    }
</style>
