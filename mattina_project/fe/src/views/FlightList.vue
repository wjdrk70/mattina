<template>
  <div class="all_list">
    <FlightSearchBox/>
     <div class="ticket_wrap">
     <div class="ticket_info">
      <div class="ticket_contents1">        
        <div><h3><i><img src="../assets/airplane1.svg"></i>가는 여정</h3></div>
        {{this.$route.query.departureInput}}  
         <i class="fas fa-long-arrow-alt-right fa-lg righticon"></i>      
        {{this.$route.query.arrivalInput}}
      </div>     
      <div v-if="InDepTime" class="ticket_contents2">
       <div><h3><i><img src="../assets/airplane1.svg"></i>오는 여정</h3></div>
          {{this.$route.query.arrivalInput}}
         <i class="fas fa-long-arrow-alt-right fa-lg righticon"></i>     
        {{this.$route.query.departureInput}} 
      </div>
     </div>
   </div> 
  <div class="api">  
    <!--list_header-->
       <div  v-if="loading">
          <div>
         <img src="../assets/loading3.gif" style="width:100%; height:500px;">
          </div>
      </div>
    
    <div class="list_body"  v-if="!loading">
      <!-- <div class="side_empty"></div> -->
      <div class="sidebar">
      <div class="sidebar_header">
        <div class="turn_title">경유</div>
        <div class="sidebar_check">
          <!-- <v-checkbox v-model="selected" color="info" label="직항" value="0" @change="updateResult"></v-checkbox>
          <v-checkbox v-model="selected" color="info" label="1회경유" value="1" @change="updateResult"></v-checkbox>
          <v-checkbox v-model="selected" color="info" label="2회경유" value="2" @change="updateResult"></v-checkbox> -->
        <div><label style="font-size:16px; color:black;"><input type="checkbox" v-model="selected" value="0" checked @change="updateResult">직항</label></div>
         <div><label style="font-size:16px; color:black;"><input type="checkbox" v-model="selected" value="1" checked @change="updateResult">1회경유</label></div>
         <div><label style="font-size:16px; color:black;"><input type="checkbox" v-model="selected" value="2" checked @change="updateResult">2회경유</label></div>
        </div>
      </div>

      <div class="sidebar_center">
        <div class="starttime_title">출발 시간대 설정</div>
        <div class="sidebar_slide">
          <div class="sidebar_slide_content">   
            <span>가는날 출발시간</span>
            <span class="sidebar_slide_departure">{{outboundDepStartTime}} - {{outboundDepEndTime}}</span>
          </div>
            <vs-slider v-model="outrange" :min="min" :max="max" @change="onChange($event)"></vs-slider>
          <div v-if="this.$route.query.cometime !=''">
            <div class="sidebar_slide_content">
              <span>오는날 출발시간</span>
              <span class="sidebar_slide_arrival">{{inboundDepStartTime}} - {{inboundDepEndTime}}</span>
            </div>
              <vs-slider v-model="inrange" :min="min" :max="max" @change="onChange($event)"></vs-slider>
          </div>
        </div>
      </div>
      <div class="sidebar_bottom">
        <div class="airport_title">항공사 선택</div>
        <div class="airport_title_box">
        <div v-for="i in airSelName.length" :key="i">
          <label style="font-size:16px; color:black;"><input type="checkbox" v-model="airCheckName" :value="airSelName[i-1]" @change="updateResult">{{airSelName[i-1]}}</label>
          <!-- <v-checkbox v-model="airCheckName" :label="airSelName[i]" :value="airSelName[i]"></v-checkbox> -->
        </div>
        </div>
          <div class="airport_title_button">
          <button @click="selectAll" >모두 선택</button>
          <button @click="reset" >모두 해제</button>
          </div>
      </div>
      </div>
      <div class="center_empty"></div>
    <!--항공권 리스트 티켓-->
   <div class="flightlist">
   
        <div class="container_flight" style="width: 100%;  padding: 0px;">
      
            <div class="count_box">
           <div class="total">총 {{flightsNum}} 개의 검색 결과</div>
              <div class="sort">
               <button v-bind="sortPrice" @click="OptionTypeUpdate(0)">최저가 순</button>
                <button v-bind="sortDuration" @click="OptionTypeUpdate(1)">최단시간 순</button>
                <button v-bind="sortOutbound" @click="OptionTypeUpdate(2)">빠른출국 순</button>
                <button v-bind="sortInbound" @click="OptionTypeUpdate(3)" v-if="InDepTime">빠른귀국 순</button>
              </div>
            </div>
      
          
      <div class="flight_ticket" v-for="(f,i) in flights"  :key="i">
        <div class="show_ticket" v-if="i<limit">
        <div class="total_bound">
        <div class="outbound">
          <div class="flight_img">
            <span><img :src="f.OutCarrierImg"></span>
            <span class="flight_name">{{f.OutCarrierName}}</span>
          </div>

          <div class="center">
        <span class="center_timefont">{{f.OutDepTime}}</span>
        <div class="center_codefont" @mouseover="isName(i)" @mouseleave="hideName(i)">{{f.OriginAirCode}}</div>
        <div class="center_namefont">{{f.OriginAirName}}</div> 
        </div>
     
          <div class="flights_duration">
              <div class="flights_duration_time">{{f.OutDuration}}</div>
              <div class="grid">
                <hr>
                   <div class="plane">
                     <i class="fa fa-plane fa-sm"></i>
                   </div>
              </div>
              <div class="flights_transfer">
               <div v-if="f.OutStopNum===0">직항</div>
                    <span v-else-if="f.OutStopNum===1">{{f.OutStopNum}}회 경유
                    <span>({{f.OutStopAll[0].code}})</span>
                    </span>
                    <span v-else-if="f.OutStopNum===2">{{f.OutStopNum}}회 경유
                 <span>({{f.OutStopAll[0].code}},{{f.OutStopAll[1].code}})</span>
                    </span>
                      <span v-else-if="f.OutStopNum===3">{{f.OutStopNum}}회 경유
                 <span>({{f.OutStopAll[0].code}},{{f.OutStopAll[1].code}},{{f.OutStopAll[2].code}})</span>
                    </span>
              </div>

          </div>
        

        <div class="center">
            <div>
            <div class="center_timefont">{{f.OutArrTime}}</div>
            <div class="center_codefont">{{f.DestAirCode}}</div>
            </div>
        </div>
        </div>
        <div class="inbound" v-if="InDepTime">
          <div class="flight_img">
            <span><img :src="f.InCarrierImg"></span>
            <span class="flight_name">{{f.InCarrierName}}</span>
          </div>
          <div class="center">
            <div>
            <span class="center_timefont">{{f.InDepTime}}</span>
            <span class="center_codefont">{{f.DestAirCode}}</span>
            </div>
          </div>
          <div class="flights_duration">
              <div class="flights_duration_time">{{f.InDuration}}</div>
              <div class="grid">
                <hr>
                   <div class="plane">
                     <i class="fa fa-plane fa-sm"></i>
                   </div>
              </div>
              <div class="flights_transfer">
                    <div v-if="f.InStopNum===0">직항</div>
                    <span v-else-if="f.InStopNum===1">{{f.InStopNum}}회 경유
                    <span>({{f.InStopAll[0].code}})</span>
                    </span>
                    <span v-else-if="f.InStopNum===2">{{f.InStopNum}}회 경유
                 <span>({{f.InStopAll[0].code}},{{f.InStopAll[1].code}})</span>
                    </span>
                      <span v-else-if="f.InStopNum===3">{{f.InStopNum}}회 경유
                 <span>({{f.InStopAll[0].code}},{{f.InStopAll[1].code}},{{f.InStopAll[2].code}})</span>
                    </span>
                </div>
          </div>
          <div class="center">
            <div>
           <span class="center_timefont">{{f.InArrTime}}</span>
           <span class="center_codefont">{{f.OriginAirCode}}</span>
            </div>
           </div>
        </div>
      </div>
      <div></div>
      <div class="selectprice">
        <div class="round" :style="`${InDepTime? 'margin: 50% 25%;':'margin:19%;'}`">
              <div class="price">
              <span class="price_box" >{{f.Symbol}}{{f.RoundPrice}}</span>
              <span class=price_button><v-btn :href="f.RoundPriceUrl">선택</v-btn></span>
              </div>
           </div>
        </div>       
    </div>    
    </div>
    <div class="btnMore">
       <button @click="moreList">더 많은 결과 표시</button>
    </div>
  </div>  
    </div>
  </div>
  </div>
  </div>
 
</template>

<script>
import FlightSearchBox from '../components/FlightSearchBox'
import qs from 'qs'
export default {
  name: "FlightList",

  data() {
    return {
      loading:false,
      flights:[

      ],
      flightsNum:0,
    limit:10,
    outboundDepStartTime:"00:00" ,
    outboundDepEndTime: "24:00",
    inboundDepStartTime:"00:00" ,
    inboundDepEndTime:  "24:00" ,
    pageIndex:0,
    pageSize:10,
    optionTypeIndex:0,
      selected: ["0","1","2"],
      min: 0,
      max: 1440,
      outrange: [0, 1440],
      inrange: [0, 1440],
      OriginAirCode:'',
      DestAirCode:'',
      OriginAirName:'',
      DestAirName:'',
      OutDepTime:'',
      OutArrTime:'',
      InDepTime:'',
      InArrTime:'',
      OutDuration:'',
      OutStops:[],
      OutStopNum:'',
      InDuration:'',
      InStops:[],
      InStopNum:'',
      RoundPrice:'',
      RoundPriceUrl:'',
      InCarrierImg:'',
      OutCarrierImg:'',
      InCarrierName:'',
      OutCarrierName:'',
      Symbol:'',
      airCheckName:[],
      airSelName:[],
      sortPrice:true,
      sortDuration:false,
      sortOutbound:false,
      sortInbound:false,
      

    sortSelects:[
    {type:'최저가 순',bool:true},
    {type:'최단시간 순',bool:false},
    {type:'출발시간 순',bool:false},
    ],
    optionSorted:[
      [],
      [],
      [],
      [],
    ],
    stopType:[
      {text:'&stops=0'},
      {text:'&stops=1'},
    ],

      optionType: [
            {text: '&sortType=price&sortOrder=asc'},//최저가
            {text: '&sortType=duration&sortOrder=asc'},//최단시간
            {text: '&sortType=outbounddeparttime&sortOrder=asc'},//출국출발시간
            {text: '&sortType=inbounddeparttime&sortOrder=asc'},//귀국출발시간
          ],

    };
  },
  mounted() {
    this.getFligths(0,0)
    this.getFligths(1,0)
    this.getFligths(2,0)
    this.getFligths(3,0)

  },
  components:{
    FlightSearchBox
  },

  methods: {
    onChange(value) {
      this.outboundDepStartTime = this.timeTransSlider(this.outrange[0]);
      this.outboundDepEndTime = this.timeTransSlider(this.outrange[1]);
      this.inboundDepStartTime = this.timeTransSlider(this.inrange[0]);
      this.inboundDepEndTime = this.timeTransSlider(this.inrange[1]);
      this.updateResult()
    },
    timeTransSlider(time) {
      let hour, minute, result;
      hour = parseInt(parseInt(time) / 60);
      minute = parseInt(time) % 60;

      if (hour < 13) {
        if (minute === 0) {
          return `${hour}:00`;
        } else {
          return `${hour}:30`;
        }
      } else {
        hour = hour;
        if (minute === 0) {
          return `${hour}:00`;
        } else {
          return `${hour}:30`;
        }
      }
    },
   isName(i){
    const name=document.querySelectorAll('.center_namefont');
    name[i].style.display='block';
    
   },
   hideName(i){
   const name=document.querySelectorAll('.center_namefont');
    name[i].style.display='none';
 
   },
      selectAll(){
      this.airCheckName = this.airSelName;
    },
    reset(){
        this.airCheckName = [];
    },

    getFligths(optionTypeIndex,addType=0){
        if(optionTypeIndex===0){

            this.loading=true

        }

      this.pageIndex=0
      this.pageSize=1000
      const apiUrl="https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0"
      let data={
        "country": "KR",
        "currency": "KRW",
        "locale": "ko-KR",
        "outboundDate": this.$route.query.leavetime,
        "cabinClass":this.$route.query.flightClass,
        "adults": this.$route.query.adults,
        "children": this.$route.query.children,
        "infants": this.$route.query.infants,
        "originPlace": `${this.$route.query.departure}-sky`,
        "destinationPlace": `${this.$route.query.arrival}-sky`,


      }

      let inboundDate = this.$route.query.cometime
        console.log(inboundDate)
      if(inboundDate!=='') data['inboundDate']=inboundDate

      this.$http({
        method: 'POST',
        url    : apiUrl,
        data   : qs.stringify(data),
        timeout: 5000,
        headers:{
             "content-type":"application/x-www-form-urlencoded",
             "x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
             "x-rapidapi-key":"8f9cdf9352mshe66630d8c7fa219p1a9887jsnfb3541a87b9c"
        }
      })
      .then(res=>{
        console.log(res)
        const location = res.headers.location
        let sessionKey=''
        let sessionKeySave=''
        for(let i=location.length-1; i>=0; i--){
          if(location.charAt(i)==='/'){break}
          sessionKeySave+=location.charAt(i)
        }
        for(let i=sessionKeySave.length-1; i>=0; i--){
          sessionKey+=sessionKeySave.charAt(i)
        }
        return sessionKey

      })
      .then(sessionKey=>{
        let pedd=new Promise((resolve,reject)=>setTimeout(resolve(sessionKey)),5000)
      pedd.then(sessionKey =>{
        console.log(sessionKey)
        const optionUrl='https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/'
        if(optionTypeIndex<4){
          var option=`?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}${this.optionType[optionTypeIndex].text}`
        }else{
            var option=`?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}${this.optionType[0].text}`
        }
        this.$http({
          method: 'GET',
          url: optionUrl+sessionKey+option,
          headers: {
        "content-type":"application/x-www-form-urlencoded",
             "x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
             "x-rapidapi-key":"8f9cdf9352mshe66630d8c7fa219p1a9887jsnfb3541a87b9c"
          }
        })
        .then(res=>{
          console.log(res)
          if(addType>1){
          this.Symbol=res.data.Currencies[0].Symbol

           for(let i=0; i<res.data.Places.length; i++){
            if(res.data.Places[i].Id==res.data.Query.OriginPlace){
           this.OriginAirCode=res.data.Places[i].Code
           this.OriginAirName=res.data.Places[i].Name

            }
            if(res.data.Places[i].Id==res.data.Query.DestinationPlace){
                 this.DestAirCode=res.data.Places[i].Code
                 this.DestAirName=res.data.Places[i].Name

            }

           }

          for (let j=0; j<res.data.Itineraries.length; j++) {

          let Options=[]
          let option
           for(let i=0; i<res.data.Itineraries[j].PricingOptions.length; i++){
                 option={'Price': Number(Math.round(res.data.Itineraries[j].PricingOptions[i].Price)).toLocaleString(),
                          'Deeplink': res.data.Itineraries[j].PricingOptions[i].DeeplinkUrl

                 }
                 Options.push(option)
           }

            this.RoundPrice=Options[0].Price
            this.RoundPriceUrl=Options[0].Deeplink

            let OutSegId=''
            let InSegId=''
            let check={}
            let OutDepartureTime=''
            let InDepartureTime=''
           for(let k=0; k<res.data.Legs.length; k++){
             if(res.data.Legs[k].Id==res.data.Itineraries[j].OutboundLegId){
               check.OutDepartureTime=this.SlideCheck(res.data.Legs[k].Departure)
               this.OutDepTime=this.timeTrans(res.data.Legs[k].Departure)
               this.OutArrTime=this.timeTrans(res.data.Legs[k].Arrival)
               this.OutDuration=this.dueTrans(res.data.Legs[k].Duration)
               this.OutStops=res.data.Legs[k].Stops
               this.OutStopNum=res.data.Legs[k].Stops.length
               this.OutCarrier=res.data.Legs[k].Carriers
               OutSegId=res.data.Legs[k].SegmentIds

               }

            if(inboundDate!==""&&res.data.Legs[k].Id==res.data.Itineraries[j].InboundLegId){
              check.InDepartureTime=this.SlideCheck(res.data.Legs[k].Departure)
              this.InDepTime=this.timeTrans(res.data.Legs[k].Departure)
              this.InArrTime=this.timeTrans(res.data.Legs[k].Arrival)
              this.InDuration=this.dueTrans(res.data.Legs[k].Duration)
              this.InStops=res.data.Legs[k].Stops
              this.InStopNum=res.data.Legs[k].Stops.length
              this.InCarrier=res.data.Legs[k].Carriers
              InSegId=res.data.Legs[k].SegmentIds
           }

         }//for k
          for(let l=0; l<res.data.Carriers.length; l++){
            if(inboundDate && res.data.Carriers[l].Id == this.InCarrier){
              this.InCarrierImg=res.data.Carriers[l].ImageUrl
              this.InCarrierName=res.data.Carriers[l].Name
            }
            if(res.data.Carriers[l].Id == this.OutCarrier){
              this.OutCarrierImg=res.data.Carriers[l].ImageUrl
              this.OutCarrierName=res.data.Carriers[l].Name
            }
          }//for l

        let stop
        let InStopAll=[]
          for (let g=0; g<this.InStops.length; g++) {
            for (let p=0; p<res.data.Places.length; p++) {
              if (this.InStops[g] == res.data.Places[p].Id) {
                stop = {
                  'code': res.data.Places[p].Code,
                  'name': res.data.Places[p].Name,
                }
                break;
              }
            }
              InStopAll.push(stop)
          }
            let OutStopAll=[]
          for (let g=0; g<this.OutStops.length; g++) {
            for (let p=0; p<res.data.Places.length; p++) {
              if (this.OutStops[g] == res.data.Places[p].Id) {
                stop = {
                  'code': res.data.Places[p].Code,
                  'name': res.data.Places[p].Name,
                }
                break;
              }
            }
                OutStopAll.push(stop)
          }
          let outSeg=[]
          for(let k=0; k<OutSegId.length; k++){
          for(let x=0; x<res.data.Carriers.length; x++){
            if(res.data.Carriers[x].Id==res.data.Segments[OutSegId[k]].Carrier){
              outSeg.push({'Name':res.data.Carriers[x].Name})
              if(optionTypeIndex===0){
                if(this.airCheckName.indexOf(res.data.Carriers[x].Name)==-1){
                  this.airCheckName.push(res.data.Carriers[x].Name)
                  this.airSelName.push(res.data.Carriers[x].Name)
                }
              }
            }
          }
          }
          let inSeg=[]
          for(let k=0; k<InSegId.length; k++){
        for(let y=0; y<res.data.Carriers.length; y++){
            if(res.data.Carriers[y].Id==res.data.Segments[InSegId[k]].Carrier){
              inSeg.push({'Name':res.data.Carriers[y].Name})
              if(optionTypeIndex===0){
                if(this.airCheckName.indexOf(res.data.Carriers[y].Name)==-1){
                  this.airCheckName.push(res.data.Carriers[y].Name)
                  this.airSelName.push(res.data.Carriers[y].Name)
                }
              }
            }
          }
          }
           let flight
           flight={
            'OutCarrierImg':this.OutCarrierImg,//항공사 이미지
            'OutCarrierName':this.OutCarrierName,//항공사 이름
            'OutDepTime': this.OutDepTime,//출발시간
            'OriginAirCode':this.OriginAirCode,//출발공항 코드
            'OriginAirName':this.OriginAirName,//출발공항 이름
            'OutDuration':this.OutDuration,//비행시간
            'OutStopAll' :OutStopAll,//경유지 코드
            'OutStops' :this.OutStops,//경유지 이름
            'OutStopNum':this.OutStopNum,//경유 횟수
            'OutArrTime': this.OutArrTime,//도착시간
            'DestAirCode' : this.DestAirCode,//도착공항 코드
            'DestAirName':this.DestAirName,//도착공항 이름
            'OneWayPrice':this.OneWayPrice,//가격
            'OneWayPriceUrl':this.OneWayPriceUrl,//가격 선택
            'InCarrierImg':this.InCarrierImg,//항공사 이미지(오는날)
            'InCarrierName':this.InCarrierName,//항공사 이름(오는날)
            'InDepTime': this.InDepTime,//출발시간(오는날)
            'InDuration':this.InDuration,//비행시간(오는날)
            'InStopAll':InStopAll,//경유지 코드(오는날)
            'InStops':this.InStops,//경유지 이름(오는날)
            'InStopNum':this.InStopNum,//경유횟수(오는날)
            'InArrTime': this.InArrTime,//도착시간(오는날)
            'Symbol':this.Symbol,
            'RoundPrice':this.RoundPrice,//가격
            'RoundPriceUrl':this.RoundPriceUrl,//가격 선택
            'Options':Options,
            'check':check,
            'outSeg':outSeg,
            'inSeg':inSeg,

           }

          if(optionTypeIndex===0){
           this.flights.push(flight)
           this.optionSorted[0].push(flight)
           }else if(optionTypeIndex===1){
             this.optionSorted[1].push(flight)
           }else if(optionTypeIndex===2){
             this.optionSorted[2].push(flight)
           }else{
              this.optionSorted[3].push(flight)
           }

          }//for j
                   console.log(this.flightsNum=this.flights.length)
                   console.log(this.optionSorted)
                  
          }
        })
        .then(()=>{
          if(addType===2){
          this.loading=false
          return
          }
          if(addType<2){
            return setTimeout(()=>{this.getFligths(optionTypeIndex,addType+1)},500);
          }
        })
        })
      })//2
    .catch((error)=>{
    console.log(error)
    })
    // this.$router.replace(`/flightlist`).catch(error => {
    //     if(error.name != "NavigationDuplicated" ){
    //       throw error;
    //     }
    //   });

    },
    timeTrans(time) {
      let hour = parseInt(time.slice(11, 13))
      if (hour > 12) {
         hour -= 12
            return `오후 ${hour}:${time.slice(14, 16)}`
          } else {
            return `오전 ${hour}:${time.slice(14, 16)}`
          }
       },
       dueTrans(duration){
          if(parseInt(duration)%60===0){
            return `${parseInt(parseInt(duration)/60)}시간`
          }
          return `${parseInt(parseInt(duration)/60)}시간 ${parseInt(duration)%60}분`
       },
       moreList(){
         const btnMore=document.querySelector('.btnMore')         
         this.limit+=10
         if(this.limit>=this.flightsNum){
           btnMore.style.display="none"
         }
      
 
       },
       OptionTypeUpdate(index){
          this.flights = []
          this.limits = 10
         this.optionTypeIndex=index

         this.updateResult()
       },
       updateResult(){
         this.flights=[]
         this.limit=10
         this.loading=true
            // this.optionSorted[this.optionTypeIndex]
         for(let i=0; i<this.optionSorted[this.optionTypeIndex].length; i++){
           console.log(this.optionSorted[this.optionTypeIndex].length)
           if(this.$route.query.cometime!==''){
          
             this.flights.push(this.optionSorted[this.optionTypeIndex][i])
      
           }//comtime
           else{
            this.flights.push(this.optionSorted[this.optionTypeIndex][i])
            }

           }
            setTimeout(()=>{this.changeLoading()},500);
       },
      changeLoading(){
        this.loading=false;
      },
          SlideCheck(time) {
          return parseInt(time.slice(11, 13)) * 60 + parseInt(time.slice(14, 16))
        },
  }
};
</script>
<style scoped>
@import "./FlightList.css";
</style>


