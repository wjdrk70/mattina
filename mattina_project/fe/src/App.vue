<template>
  <div id="app">
     <Header></Header>
    <v-content>
      <v-app>
      <router-view></router-view>
      </v-app>
    </v-content>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'app',
  components: { Header }
}
</script>
