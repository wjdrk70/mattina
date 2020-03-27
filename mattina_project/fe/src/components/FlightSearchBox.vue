<template>
    <div class="FlightSearchBox">
       <div class="list_header">
      <div class="list_total_header">
      <v-radio-group v-model="radios" row>
        <v-radio label="왕복" color="white" value="round"  @change="changeInput(0)"></v-radio>
        <v-radio label="편도" color="white" value="oneway" @change="changeInput(1)"></v-radio>
        </v-radio-group>      
      <div class="list_header_info">
        <div class="list_content"> 
            <input class="content1" 
                    type="text"
                    placeholder="출발지" 
                   v-model="departureInput"  
                   @keyup="Depouputbox2"
                   @keydown.up="pressUP('departure')"
                   @keydown.down="pressDown('departure')"
                   @keydown.enter="pressEnter('departure')"
                   @input="departureInput = $event.target.value">   
            <div class="dep-tooltip2">             
              <i></i>
            </div>                    
             <div class="searchList2" v-show="open">
                <div class="dep-box2">
                  <!-- <div class="triangle-box2"></div> -->
                </div>
                <div class="dep-airlist2">                  
                  <div
                    v-for="(airport,id) in departureOutput2.slice(0,scrollMore)"
                    :key="id"
                    class="country-name2" 
                     :class="{'is-active' : id ===depArrow}">
                  <div style="color: black; font-size:17px;">
                      <div class="airportList">
                        <div class="airport-name"
                          @click="selectAir(`${airport.code}`, `${airport.name_kor}`,'departure')">
                          <i class="anime-i"></i>
                          {{airport.name_kor}} {{airport.code}}                              
                          <span  class="airport-nation">{{airport.nation_kor}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> 
            <!-- {{this.$route.query.departureInput}}        -->
        </div>

         <div class="list_content">           
             <input value="name"
                    class="content1" 
                    type="text" 
                    placeholder="도착지"
                    v-model="arrivalInput"                   
                    @keyup="Arroutputbox2"
                    @keydown.up="pressUP('arrival')"
                    @keydown.down="pressDown('arrival')"
                    @keydown.enter="pressEnter('arrival')"
                    @input="arrivalInput = $event.target.value">
        <div class="arr-tooltip2">            
            <i></i>
          </div>
          <div class="searchList-arr2">
            <div class="arr-box2">
              <!-- <div class="triangle-box2"></div> -->
            </div>
            <div class="arr-airlist2">
              <div
                v-for="(airport,id) in arrivalOutput2.slice(0,scrollMore)"
                :key="id"
                class="country-name2"
                :class="{'is-active' : id===arrArrow}">
                <div style="color: black; font-size:17px;">
                  <div class="airportList">
                    <div class="airport-name"
                      @click="selectAir(`${airport.code}`, `${airport.name_kor}`,'arrival')">
                      <i class="anime-arr-i"></i>
                      {{airport.name_kor}} {{airport.code}}                  
                      <span class="airport-nation">{{airport.nation_kor}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>         
        </div>

        <div class="list_content">
        <v-menu>
          <template v-slot:activator="{ on }">
            <input type="text" 
                   dense 
                   class="content2" 
                   placeholder="가는 날"
                   v-model="leavetime"                          
                   readonly
                   v-on="on">
          </template>
          <v-date-picker v-model="leavetime" :min="mindate" @input="menu=false"></v-date-picker>
        </v-menu>
            <!-- {{this.$route.query.leavetime}} -->
        </div>
      
        <div class="list_content">
           <v-menu>
          <template v-slot:activator="{ on }">
            <input type="text" 
                   dense 
                   class="content2"
                   placeholder="오는 날" 
                   v-model="cometime"                          
                   readonly 
                   @click="changeRadio"                   
                   v-on="on">
          </template>
          <v-date-picker v-model="cometime" :min="minComedate" @input="menu2=false"></v-date-picker>
        </v-menu>             
              <!-- {{this.$route.query.cometime}} -->
        </div>
       

        <div class="list_content">           
          <v-menu v-model="menu3"
                  :close-on-content-click="false"                    
                  transition="scale-transition"
                  offset-y
                  min-width="290px">
              <template #activator="{ on }">
                <input class="content3" 
                      dense
                      type="text" 
                      v-on="on"
                      readonly
                      :value="`${adults + infants + children} ,${flightClass}`">
              </template>

            <v-card class="mx-auto"  width="300px" height="415px" @input="menu3=false">
              <v-card-text style="background:#1E88E5 ">
                <div style="color:white; font-size:18px; height:15px ">좌석</div>
                </v-card-text>                    
              <v-select :items="classes" :value="flightClass" :item-value="flightClass" 
                      flat  v-model="flightClass" solo ></v-select>                               
                <v-card-text style="background:#1E88E5; margin-top:-22px">
                  <div style="color:white;  font-size:18px; height:15px"  >승객</div>
                  </v-card-text>         
              <v-card-actions style="margin-top: 30px;" >
                <v-card-text>
                  <p style="font-size: 18px;
                            font-weight: bold;">성인</p>
                </v-card-text>
                <button class="minus" @click="minusAdults">
                  <v-icon color="white">mdi-minus</v-icon>
                </button>
                <p
                  style="font-size: 18px;
                        font-weight: bold;
                        margin: 0px 20px 0px 0px;"
                        >{{adults}}</p>
                <button class="plus" @click="plusAdults">
                  <v-icon color="white">mdi-plus</v-icon>
                </button>
              </v-card-actions>

              <v-card-actions style="margin-top: 10px;">
                <v-card-text>
                  <p style="font-size: 18px;
                            font-weight: bold;">어린이</p>
                    <p style="font-size: 12px; ">만 2~11세</p>  
                </v-card-text>                        
                <button class="minus" @click="minusChildren">
                  <v-icon color="white">mdi-minus</v-icon>
                </button>
                <p
                  style="font-size: 18px;
                        font-weight: bold;
                        margin: 0px 20px 0px 0px;"
                        >{{children}}</p>
                <button class="plus" @click="plusChildren">
                  <v-icon color="white">mdi-plus</v-icon>
                </button>
              </v-card-actions>
                  
              <v-card-actions style="margin-top: 7px;">
                <v-card-text>
                  <p style="font-size: 18px;
                            font-weight: bold;">유아</p>
                    <p style="font-size: 12px; ">만 2세 미만</p>          
                </v-card-text>
                <button class="minus" @click="minusInfants">
                  <v-icon color="white">mdi-minus</v-icon>
                </button>
                <p
                  style="font-size: 18px;
                        font-weight: bold;
                        margin: 0px 20px 0px 0px;"
                        >{{infants}}</p>
                <button class="plus" @click="plusInfants">
                  <v-icon color="white">mdi-plus</v-icon>
                </button>
              </v-card-actions>                        
            </v-card>
          </v-menu>   
                <!-- 성인 : {{this.$route.query.adults}} 어린이: {{this.$route.query.children}}
                유아 : {{this.$route.query.infants}} | {{this.$route.query.flightClass}} -->
        </div>

        <div>        
           <div class="search-btn" style="width: 100%;">
              <button class="list_search" @click="searchTikect()">검색</button>
           </div>
        </div>

        <div></div>
      </div>
    </div>
    </div>
    </div>
</template>
<script>
import airportList from "./AirportList.json";

export default {
    name:"FlightSearchBox",    
    data() { 
      const today = new Date();
        return {
          scrollMore:10,
          depArrow:-1,
          arrArrow:-1,
          flightClass:'economy',
          classes: ["economy", "business", "first"],
          radios:'round',

          open: false,

          airportList: airportList,

          departureInput:this.$route.query.departureInput,
          arrivalInput:this.$route.query.arrivalInput,
          leavetime:this.$route.query.leavetime,
          cometime:this.$route.query.cometime,
          adults:Number(this.$route.query.adults),
          infants:Number(this.$route.query.infants),
          children:Number(this.$route.query.children),
          flightClass:this.$route.query.flightClass,

          departureOutput2:[],
          arrivalOutput2: [],

          departure: this.$route.query.departure,
          arrival: this.$route.query.arrival,
          mindate: today.toISOString().substr(0, 10),
          menu: false,
          menu2: false,
          menu3: false
            
        }
    },
    
    created() {
        if(this.cometime===''){
        this.radios="oneway"
      }else{
        this.radios="round"
      }
    },
    mounted() {
  

    this.depScroll = document.querySelector(".dep-airlist2");
    this.depScroll.addEventListener("scroll", this.scrollDetection);
    this.depScroll = document.querySelector(".arr-airlist2");
    this.depScroll.addEventListener("scroll", this.scrollDetection);

    document.body.addEventListener("click", this.hiddenList);
    document.body.addEventListener("keydown", this.hideTooltip);
  },

  updated() {},
  destroyed() {
    document.body.removeEventListener("click", this.hiddenList);
  },

  methods: {
     hideTooltip() {
      const tooltip1 = document.querySelector(".dep-tooltip2");
      const tooltip2 = document.querySelector(".arr-tooltip2");    
      tooltip1.style.display = "none";
      tooltip2.style.display = "none";
     
    },

    searchTikect() {
      const tooltip1 = document.querySelector(".dep-tooltip2");
      const tooltip2 = document.querySelector(".arr-tooltip2");
      const query = {};
      query.departure = this.departure;
      query.arrival = this.arrival;
      query.departureInput = this.departureInput;
      query.arrivalInput = this.arrivalInput;
      query.leavetime = this.leavetime;
      query.cometime = this.cometime;
      query.flightClass = this.flightClass;
      query.adults = this.adults;
      query.children=this.children;
      query.infants = this.infants;

      if (query.departure || query.arrival ||query.leavetime || query.cometime || query.adults || query.children || query.infants) {
        this.$router.push({ name: "FlightList", query: query });
      } else if (query.departureInput === "") {
        tooltip1.classList.add("animated", "flash");
        tooltip1.style.display = "block";
      } else if (query.arrivalInput === "") {
        tooltip2.classList.add("animated", "flash");
        tooltip2.style.display = "block";
      }
    },
    hiddenList(e) {
      this.scrollMore = 10;
      const searchInput = [
        ".dep-airlist2",
        ".dep-box2",
        ".arr-airlist2",
        ".arr-box2"
      ];
      searchInput.forEach(className => {
        const countryList = document.querySelector(className);
        countryList.style.display = "none";
        countryList.style.position = "none";
        countryList.style.zIndex = "1";
      });
    },

    Depouputbox2(){
      this.open =true;
      this.departureSearch2();
    },
     Arroutputbox2() {
      this.arrivalSearch2();
    },
    selectAir(airCode, airportName, travelType) {
      const airportNameSplit = airportName.replace(/\s/g, "");
      if (travelType === 'departure') {
        this.departure = airCode;
        this.departureInput = `${airportNameSplit} (${this.departure})`;
      } else {
        this.arrival = airCode;
        this.arrivalInput = `${airportNameSplit}  (${this.arrival})`;
      }
    },

     departureSearch2() {     
      this.departureOutput2= this.airportList.filter(airport => {
        if (
          airport.name_kor.includes(this.departureInput) || 
          airport.name_eng.toLowerCase() .match(this.departureInput.toLowerCase()) ||
          airport.nation_kor.includes(this.departureInput) ||
          airport.nation_eng.toLowerCase().includes(this.departureInput.toLowerCase()) ||
          airport.city_kor.toLowerCase().includes(this.departureInput) ||
          airport.city_eng.toLowerCase().includes(this.departureInput.toLowerCase()) ||
          airport.code.toLowerCase().includes(this.departureInput.toLowerCase())
        ) {
          return airport;
        }
      });
    },
     arrivalSearch2() {
      this.arrivalOutput2 = this.airportList.filter(airport => {
        if (
          airport.name_kor.includes(this.arrivalInput) ||
          airport.name_eng.toLowerCase().match(this.arrivalInput.toLowerCase()) ||
          airport.nation_kor.includes(this.arrivalInput) ||
          airport.nation_eng.toLowerCase().includes(this.arrivalInput.toLowerCase()) ||
          airport.city_kor.toLowerCase().includes(this.arrivalInput) ||
          airport.city_eng.toLowerCase().includes(this.arrivalInput.toLowerCase()) ||
          airport.code.toLowerCase().includes(this.arrivalInput.toLowerCase())
        ) {
          return airport;
        }
      });
    },
    plusAdults(){
      this.adults += 1;
    },
    minusAdults(){
      if(this.adults !== 1){
      this.adults -= 1;
      }
    },
    plusChildren(){
      this.children += 1;
      
    },
    minusChildren(){
      if(this.children >= 1){
      this.children -= 1;
      }
    },
    plusInfants(){
      this.infants += 1;
      
    },
    minusInfants(){
      if(this.infants >= 1){
      this.infants -= 1;
      }
    },
     pressDown(tripType){
      if(tripType==='departure'){
        if(this.depArrow<this.departureOutput2.length){          
          this.depArrow  +=1 
           }   
        }else{
          if(this.arrArrow<this.arrivalOutput2.length){
            this.arrArrow += 1
          }
        }
        if(this.depArrow === 10 || this.arrArrow===10){
           return this.depArrow=0,this.arrArrow = 0
        }         
    },

    pressUP(tripType){
         if(tripType==='departure'){
           if(this.depArrow > 0){
             this.depArrow --
           }
         }else{
           if(this.arrArrow > 0){
             this.arrArrow --
           }
        }
    },

    pressEnter(tripType){
      if(tripType ==='departure'){
          this.selectAir(this.departureOutput2[this.depArrow].code,
                         this.departureOutput2[this.depArrow].name_kor,
                         'departure')
        }else{
        this.selectAir(this.arrivalOutput2[this.arrArrow].code,
                       this.arrivalOutput2[this.arrArrow].name_kor,
                       'arrival')
      }
      },
      changeRadio(){
        this.radios="round"
      },
      changeInput(type){
        if(type===1){
        this.cometime=''
        }else{
          this.cometime=this.leavetime
        }
      }
    },

  watch: {
    departureInput() {
      const leftInput = document.querySelector(".searchList2");
      const countryList = document.querySelector(".dep-airlist2");
      const depbox = document.querySelector(".dep-box2");
      countryList.style.display = "block";
      depbox.style.display = "block";
    },
    arrivalInput() {
      const countryList = document.querySelector(".arr-airlist2");
      const arrbox = document.querySelector(".arr-box2");
      countryList.style.display = "block";
      arrbox.style.display = "block";
    }
  },
   computed: {
    minComedate(){
      return this.leavetime
    }
  }
};
</script>
<style scoped>
@import "./FlightSearchBox.css";
</style>