webpackJsonp([11],{BQma:function(t,s){},DgPo:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("LPk9"),n=a("9woI"),i=a.n(n),u=a("6ROu"),l=a.n(u),o=a("x47x"),r={data:function(){return{hash:this.$route.params.hash,infoData:[],inputs:[],allInputs:0,outputs:[],allOutputs:0,times:""}},components:{Back:e.a},mounted:function(){this.getHashInfo("/accountledger/tx/"+this.hash)},methods:{getHashInfo:function(t){var s=this;this.$fetch(t).then(function(t){console.log(t),s.infoData=t.data,s.times=l()(t.data.time).format("YYYY-MM-DD HH:mm:ss");var a=new o.BigNumber(1e-8);if(t.data.inputs.length>0)for(var e=0;e<t.data.inputs.length;e++)t.data.inputs[e].value=a.times(t.data.inputs[e].value).toFixed(8),s.allInputs=Object(o.BigNumber)(s.allInputs).plus(t.data.inputs[e].value).toString();if(s.inputs=t.data.inputs,t.data.outputs.length>0)for(var n=0;n<t.data.outputs.length;n++)t.data.outputs[n].value=a.times(t.data.outputs[n].value).toFixed(8),s.allOutputs=Object(o.BigNumber)(s.allOutputs).plus(t.data.outputs[n].value).toString();s.outputs=t.data.outputs})},hashCopy:function(t){i()(t),this.$message({message:this.$t("message.c129"),type:"success",duration:"800"})}}},_={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"deal-info"},[a("Back",{attrs:{backTitle:this.$t("message.transactionManagement")}}),t._v(" "),a("div",{staticClass:"deal-info-top"},[a("div",{staticClass:"deal-left fl"},[a("div",[t._v("  "+t._s(t.$t("message.input"))),a("span",[t._v(" "+t._s(this.allInputs.toString())+" NULS")])]),t._v(" "),a("ul",t._l(t.inputs,function(s){return a("li",[a("label",{staticClass:"cursor-p",attrs:{title:t.$t("message.c145")},on:{click:function(a){t.hashCopy(s.address)}}},[t._v(t._s(s.address))]),t._v(" "),a("span",[t._v(t._s(s.value.toString()))])])}))]),t._v(" "),a("div",{staticClass:"deal-right fr"},[a("div",[t._v("  "+t._s(t.$t("message.output"))),a("span",[t._v(t._s(this.allOutputs.toString())+" NULS")])]),t._v(" "),a("ul",t._l(t.outputs,function(s){return a("li",[a("label",{staticClass:"cursor-p",attrs:{title:t.$t("message.c145")},on:{click:function(a){t.hashCopy(s.address)}}},[t._v(t._s(s.address))]),t._v(" "),a("span",[t._v(t._s(s.value.toString()))])])}))])]),t._v(" "),a("div",{staticClass:"deal-case"},[a("h3",[t._v(t._s(t.$t("message.overview")))]),t._v(" "),a("ul",[a("li",[a("span",[t._v(t._s(t.$t("message.tradingTime")))]),t._v(t._s(this.times))]),t._v(" "),a("li",[a("span",[t._v(t._s(t.$t("message.miningFee1")))]),t._v(t._s(1e-8*parseFloat(t.infoData.fee))+" NULS")]),t._v(" "),a("li",{staticClass:"cursor-p",attrs:{title:t.$t("message.c145")},on:{click:function(s){t.hashCopy(t.infoData.hash)}}},[a("span",[t._v(t._s(t.$t("message.autograph")))]),t._v(t._s(t.infoData.hash)+"\n            ")]),t._v(" "),a("li",[a("span",[t._v(t._s(t.$t("message.transactionType")))]),t._v("\n                "+t._s(t.$t("message.type"+t.infoData.type))+"\n            ")]),t._v(" "),a("li",[a("span",[t._v(t._s(t.$t("message.transactionState")))]),t._v(t._s(t.$t("message.statusS"+t.infoData.status))+"\n            ")]),t._v(" "),a("li",[a("span",[t._v(t._s(t.$t("message.blockHeight")))]),t._v(t._s(t.infoData.blockHeight<0?"- -":t.infoData.blockHeight))]),t._v(" "),a("li",[a("span",[t._v(t._s(t.$t("message.remarks")))]),t._v(t._s(t.infoData.remark))])])])],1)},staticRenderFns:[]};var v=a("vSla")(r,_,!1,function(t){a("BQma")},null,null);s.default=v.exports}});