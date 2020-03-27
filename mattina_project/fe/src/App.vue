<template>
  <div id="app">
     <Header>
     </Header>
      <!-- <KaKaoLogin
                 api-key="e357aef894539038189dc1ba5576d5ed"
                 image="kakao_login_btn_small_ov"
                 :on-success=onSuccess
                 :on-failure=onFailure
                /> -->
    <v-content>
      <v-app>
      <router-view :key="$route.fullPath"></router-view>
      </v-app>
    </v-content>
  </div>
</template>

<script>

import Header from './components/Header'
// import KaKaoLogin from 'vue-kakao-login'


// let onSuccess = (data) => {
//   console.log(data)
//   console.log("success")
// }
// let onFailure = (data) => {
//   console.log(data)
//   console.log("failure")
// }

export default {
  name: 'app',
  components: { Header},
  //   methods: {
  //   onSuccess,
  //   onFailure
  // }
}

</script>
