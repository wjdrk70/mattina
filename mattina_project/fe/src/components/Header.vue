<template>
<header style="background:white;">
  <div class="header">
      <div class="header-left">
        <a href="/"><img src="@/assets/m_logo.svg"></a>
      </div>
      <div class="header-right">
       <ul class="toggel_icons">
          <li>
            <router-link to="/" class="airline"><i class="airline-icon"></i>
            <button class="btn airline">항공권</button></router-link>
          </li>
          <li>
            <router-link to="/guide" class="guide"><i class="guide-icon"></i>
            <button class="btn guide">가이드</button></router-link>
          </li> 
          <li>
            <router-link to="/log-in" class="login"><i class="login-icon"></i>
            <button class="btn login">로그인</button></router-link>
          </li> 
      </ul>     
      </div>
       <button class="toggle-btn" @click="toggelDrop">
        <v-icon x-large  
            >menu</v-icon>
       </button>
      </div>
</header>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
    }
  },
  methods: {
    toggelDrop(){
      const tg=document.querySelector('.toggel_icons')
      tg.classList.toggle('active');
    }
  },
}
</script>
<style scoped>
@import './Header.css';
</style>
