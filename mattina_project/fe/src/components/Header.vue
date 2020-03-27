<template>
<header style="background:white;">
  <div class="header">
      <div class="header_left">
        <a href="/"><img src="@/assets/m_logo.svg"></a>
      </div>
      <div class="header_right">      
       <ul>
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
     
       <button class="toggle_btn" @click ='show = !show'>
        <v-icon x-large>menu</v-icon> 
        <transition name="toggle">
          <div v-if="show" class="dropdown_content">          
            <ul>
              <li style="border-bottom: 1px solid #c9c7c7;">
                <router-link to="/" class="airline"><i class="airline-icon"></i>
                <button>항공권</button></router-link>
              </li>
              <li style="border-bottom: 1px solid #c9c7c7;">
                <router-link to="/guide" class="guide"><i class="guide-icon"></i>
                <button>가이드</button></router-link>
              </li> 
              <li>
                <router-link to="/log-in" class="login"><i class="login-icon"></i>
                <button>로그인</button></router-link>
            
              </li> 
            </ul> 
           </div>
           </transition>
       </button> 

      </div>
</header>
</template>
<script>


 
export default {
  name: 'Header',
  
  data () {
    return {
    show:false
    }
  },

}
</script>
<style scoped>
@import './Header.css';
</style>


