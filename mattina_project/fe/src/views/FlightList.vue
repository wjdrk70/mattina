<template>
  <div class="api">
    <div class="guest_info"></div>
    <div class="list_header">
      <div class="list_header_leftinside">
        <div class="airportinfo_header">
          {{this.$route.query.departureInput}}({{this.$route.query.departure}}) - 
          {{this.$route.query.arrivalInput}}({{this.$route.query.arrival}})</div>
        <div class="carbin-info">
          성인 : {{this.$route.query.adults}} 어린이: {{this.$route.query.children}}  
          유아 : {{this.$route.query.infants}} | {{this.$route.query.flightClass}}</div> 
      </div>
      <div class="list_header_rightinside">
        <div class="deptime-info">{{this.$route.query.leavetime}}</div>
        <div class="arrtime-info">{{this.$route.query.cometime}}</div>
      </div>
    </div>
    <div class="list_body">
      <div class="side_empty"></div>
      <div class="sidebar">
      <div class="sidebar_header">
        <div class="turn_title">경유</div>
        <div class="sidebar_check">
          <!-- <v-checkbox v-model="selected" color="info" label="직항" value="0" @change="updateResult"></v-checkbox>
          <v-checkbox v-model="selected" color="info" label="1회경유" value="1" @change="updateResult"></v-checkbox>
          <v-checkbox v-model="selected" color="info" label="2회경유" value="2" @change="updateResult"></v-checkbox> -->
         <label style="font-size:16px; color:black;"><input type="checkbox" v-model="selected" value="0" checked>직항</label>
         <label style="font-size:16px; color:black;"><input type="checkbox" v-model="selected" value="1" checked>1회경유</label>
         <label style="font-size:16px; color:black;"><input type="checkbox" v-model="selected" value="2" checked>2회경유</label>
        </div>
      </div>

      <div class="sidebar_center">
        <div class="starttime_title">출발 시간대 설정</div>
        <div class="sidebar_slide">
          <span>가는날 출발시간</span>
          <span class="sidebar_slide_departure">{{outboundDepStartTime}} - {{outboundDepEndTime}}</span>
          <vs-slider v-model="outrange" :min="min" :max="max" @change="onChange($event)" />

          <div v-if="this.$route.query.cometime !=''">
            <span>오는날 출발시간</span>
            <span class="sidebar_slide_arrival">{{inboundDepStartTime}} - {{inboundDepEndTime}}</span>
            <vs-slider v-model="inrange" :min="min" :max="max" @change="onChange($event)" />
          </div>
        </div>
      </div>
      <div class="sidebar_bottom">
        <div class="airport_title">항공사 선택</div>
        <div v-for="i in airSelName.length" :key="i">
          <label style="font-size:16px; color:black;"><input type="checkbox" v-model="airCheckName" :value="airSelName[i-1]">{{airSelName[i-1]}}</label>
          <!-- <v-checkbox v-model="airCheckName" :label="airSelName[i]" :value="airSelName[i]"></v-checkbox> -->
        </div>
      </div>
      </div>
      <div class="center_empty"></div>
    <!--항공권 리스트 티켓-->
   <div class="flightlist">
      <div v-if="loading">
          <div>
         <img src="../assets/blue.gif">
          </div>
          </div>
        <div style="width: 100%;  padding: 0px;" v-if="!loading">
        <div class="ticket_info">          
            <div class="butt">
           <div class="total">총 {{flightsNum}} 개의 검색 결과</div>
              <div class="but">
                <v-btn class="tul" v-model="sortPrice" @click="OptionTypeUpdate(0)">최저가 순</v-btn>    
                <v-btn class="tul" v-model="sortDuration" @click="OptionTypeUpdate(1)">최단시간 순</v-btn>
                <v-btn class="tul" v-model="sortOutbound">빠른출국 순</v-btn> 
                <v-btn class="tul" v-model="sortInbound" v-if="inDeptime">빠른귀국 순</v-btn> 
                <!-- <v-btn v-for="(sortSelect,i) in sortSelects" :key="i.bool">{{sortSelect.type}}</v-btn> -->
                
              </div> 
            </div>
          </div>
      <div v-esle class="flight_ticket" v-for="i in flights.length>limit?limit:flights.length" :key="i">
        <div class="show_ticket">
        <div class="outbound" >          
          <div class="flight_img">
            <span><img :src="flights[i].OutCarrierImg"></span>
            <span class="flight_name">{{flights[i].OutCarrierName}}</span> 
          </div>
        <div class="center">
          <div>
        <span class="center_timefont">{{flights[i].OutDepTime}}</span>
        <span class="center_codefont">{{flights[i].OriginAirCode}}</span>
          </div>
        </div>
        <div>
          <div class="flights_duration">
              <div class="flights_duration_time">{{flights[i].OutDuration}}</div>                     
              <div class="grid">
                <hr>
                   <div class="plane">
                     <i class="fa fa-plane fa-sm"></i>
                   </div>
              </div>               
              <div class="flights_transfer">
               <div v-if="flights[i].OutStopNum===0">직항</div>
              <div v-else>이건 아바{{flights[i].OutStopNum}}회 경유</div>
              <div v-for="stop in flights[i].OutStopAll" :key="stop">{{stop.code}}</div>              
              </div>
                                       
          </div>
        </div>
        
        <div class="center">
            <div>
            <span class="center_timefont">{{flights[i].OutArrTime}}</span>
            <span class="center_codefont">{{flights[i].DestAirCode}}</span> 
            </div>
        </div>        
        </div>
        <div class="inbound" v-if="InDepTime">
          <div class="flight_img">
            <span><img :src="flights[i].InCarrierImg"></span>
            <span class="flight_name">{{flights[i].InCarrierName}}</span> 
          </div>
          <div class="center">
            <div>
            <span class="center_timefont">{{flights[i].InDepTime}}</span>
            <span class="center_codefont">{{flights[i].DestAirCode}}</span>
            </div>
          </div>
          <div class="flights_duration">
              <div class="flights_duration_time">{{flights[i].InDuration}}</div>
              <div class="grid">
                <hr>
                   <div class="plane">
                     <i class="fa fa-plane fa-sm"></i>
                   </div>
              </div> 
              <div class="flights_transfer">           
                    <div v-if="flights[i].InStopNum===0">직항</div>
                    <div v-else>이건 인바{{flights[i].InStopNum}}회 경유</div>
                    <div v-for="stop in flights[i].InStopAll" :key="stop">{{stop.code}}</div>
                </div> 
          </div>
          <div class="center">
            <div>
           <span class="center_timefont">{{flights[i].InArrTime}}</span>
           <span class="center_codefont">{{flights[i].OriginAirCode}}</span>
            </div>
           </div>
        </div>
      </div> 
      <div class="selectprice">
        <div class="round" :style="`${InDepTime? 'margin: 45% 25% 45% 26%;':'margin:19%;'}`">
              <div class="price">
              <span class="price_box" >{{flights[i].Symbol}}{{flights[i].RoundPrice}}</span>
              <span class=price_button><v-btn :href="flights[i].RoundPriceUrl">선택</v-btn></span>            
              </div>
           </div>
        </div>
    </div>
    </div>
     <div>
       <v-btn @click="moreList">더 보기</v-btn>
     </div>
     <div class="side_empty"></div>
    
    </div>
  </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: "FlightList",
  props: {
    limit: {type: Number, default: 10},
    outboundDepStartTime: { type: String, default: "00:00" },
    outboundDepEndTime: { type: String, default: "24:00" },
    inboundDepStartTime: { type: String, default: "00:00" },
    inboundDepEndTime: { type: String, default: "24:00" },
    pageIndex:{type:Number,default:0},
    pageSize:{type:Number,default:10},
    optionTypeIndex:{type:Number,default:0},
  },
  data() {
    return {
      loading:false,
      flights:[
    
      ],
      flightsNum:0,
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
  
  methods: {
    onChange(value) {
      this.outboundDepStartTime = this.timeTransSlider(this.outrange[0]);
      this.outboundDepEndTime = this.timeTransSlider(this.outrange[1]);
      this.inboundDepStartTime = this.timeTransSlider(this.inrange[0]);
      this.inboundDepEndTime = this.timeTransSlider(this.inrange[1]);
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
             "x-rapidapi-key":"e2b10f9ffdmsh38e70977a0e7bbdp11f444jsn3f4b92c83b27"
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
      .then(sessionKey =>{
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
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
		        "x-rapidapi-key": "e2b10f9ffdmsh38e70977a0e7bbdp11f444jsn3f4b92c83b27"
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
                        
           for(let k=0; k<res.data.Legs.length; k++){
             if(res.data.Legs[k].Id==res.data.Itineraries[j].OutboundLegId){
               this.OutDepTime=this.timeTrans(res.data.Legs[k].Departure)
               this.OutArrTime=this.timeTrans(res.data.Legs[k].Arrival)
               this.OutDuration=this.dueTrans(res.data.Legs[k].Duration)
               this.OutStops=res.data.Legs[k].Stops
               this.OutStopNum=res.data.Legs[k].Stops.length
               this.OutCarrier=res.data.Legs[k].Carriers
               OutSegId=res.data.Legs[k].SegmentIds    
            
               } 
              
            if(inboundDate!==""&&res.data.Legs[k].Id==res.data.Itineraries[j].InboundLegId){
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
          for(let k=0; k<OutSegId.length; k++){
          for(let x=0; x<res.data.Carriers.length; x++){
            if(res.data.Carriers[x].Id==res.data.Segments[OutSegId[k]].Carrier){
              if(optionTypeIndex===0){
                if(this.airCheckName.indexOf(res.data.Carriers[x].Name)==-1){
                  this.airCheckName.push(res.data.Carriers[x].Name)
                  this.airSelName.push(res.data.Carriers[x].Name)
                }
              }
            }
          }
          }
          for(let k=0; k<InSegId.length; k++){
        for(let y=0; y<res.data.Carriers.length; y++){
            if(res.data.Carriers[x].Id==res.data.Segments[InSegId[k]].Carrier){
              if(optionTypeIndex===0){
                if(this.airCheckName.indexOf(res.data.Carriers[x].Name)==-1){
                  this.airCheckName.push(res.data.Carriers[x].Name)
                  this.airSelName.push(res.data.Carriers[x].Name)
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
          this.loading=false
          if(addType<2){
            return setTimeout(()=>{this.getFligths(optionTypeIndex,addType+1)},500);
          }
        })

      })//2
    .catch((error)=>{
    console.log(error)
    })

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
      this.limit+=10
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

            setTimeout(()=>{this.changeLoading()},500);
       },
      changeLoading(){
        this.loading=false;
      }
  }
};
</script>
<style scoped>
@import "./FlightList.css";
</style>
