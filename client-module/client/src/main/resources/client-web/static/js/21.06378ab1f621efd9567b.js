webpackJsonp([21],{"3Nfg":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("LPk9"),n=a("6ROu"),i=a.n(n),l=a("x47x"),o={data:function(){return{backTitle:this.$route.query.agentName,backUrl:"/nodeInfo",backParams:this.$route.query.txHash,txHash:this.$route.query.txHash,pledgeData:[],total:0}},components:{Back:s.a},mounted:function(){this.getConsensusDeposit("/consensus/deposit/agent/"+this.txHash,{pageSize:"20",pageNumber:"1"})},methods:{getConsensusDeposit:function(t,e){var a=this;this.$fetch(t,e).then(function(t){if(t.success){a.total=t.data.total;for(var e=new l.BigNumber(1e-8),s=0;s<t.data.list.length;s++)t.data.list[s].deposit=parseFloat(e.times(t.data.list[s].deposit).toString()),t.data.list[s].time=i()(t.data.list[s].time).format("YYYY-MM-DD hh:mm:ss");a.pledgeData=t.data.list}})},pledgeSize:function(t){this.getConsensusDeposit("/consensus/deposit/agent/"+this.txHash,{pageNumber:t,pageSize:"20"})}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"all-pledge"},[a("Back",{attrs:{backTitle:t.backTitle}}),t._v(" "),a("h2",[t._v(t._s(t.$t("message.c55")))]),t._v(" "),a("el-table",{attrs:{data:t.pledgeData,stripe:!1}},[a("el-table-column",{attrs:{prop:"address",label:t.$t("message.tabName"),width:"450",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"deposit",label:t.$t("message.amount"),width:"140",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:t.$t("message.state"),width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(t.$t("message.status"+e.row.status))+"\n      ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"time",label:t.$t("message.c49"),"min-width":"180",align:"center"}})],1),t._v(" "),a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.totalOK=this.total>20,expression:"totalOK = this.total > 20 ? true:false"}],staticClass:"cb",attrs:{layout:"prev, pager, next","page-size":20,total:this.total},on:{"current-change":t.pledgeSize}})],1)},staticRenderFns:[]};var u=a("vSla")(o,r,!1,function(t){a("V34c")},null,null);e.default=u.exports},V34c:function(t,e){}});