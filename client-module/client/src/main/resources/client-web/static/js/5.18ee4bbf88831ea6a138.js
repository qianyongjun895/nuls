webpackJsonp([5],{"0R/d":function(t,e,r){"use strict";r("wPKN"),r("QOif");var o={data:function(){return{}},mounted:function(){},methods:{codeMaker:function(t){$(".qrcode").html(""),$(".qrcode").qrcode({render:"canvas",width:256,height:256,text:t,typeNumber:-1,correctLevel:2,background:"#ffffff",foreground:"#000000"})},hideShow:function(){this.$emit("codeShowOks","false")}}},s={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"modal-overlay",on:{click:this.hideShow}},[this._m(0)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-data"},[e("div",{staticClass:"qrcode"})])}]};var n=r("vSla")(o,s,!1,function(t){r("I2l+")},null,null);e.a=n.exports},"I2l+":function(t,e){},QOif:function(t,e){var r;(r=jQuery).fn.qrcode=function(t){var e;function o(t){this.mode=e,this.data=t}function s(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}function n(t,e){if(void 0==t.length)throw Error(t.length+"/"+e);for(var r=0;r<t.length&&0==t[r];)r++;this.num=Array(t.length-r+e);for(var o=0;o<t.length-r;o++)this.num[o]=t[o+r]}function i(t,e){this.totalCount=t,this.dataCount=e}function a(){this.buffer=[],this.length=0}o.prototype={getLength:function(){return this.data.length},write:function(t){for(var e=0;e<this.data.length;e++)t.put(this.data.charCodeAt(e),8)}},s.prototype={addData:function(t){this.dataList.push(new o(t)),this.dataCache=null},isDark:function(t,e){if(0>t||this.moduleCount<=t||0>e||this.moduleCount<=e)throw Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){if(1>this.typeNumber){var t=1;for(t=1;40>t;t++){for(var e=i.getRSBlocks(t,this.errorCorrectLevel),r=new a,o=0,s=0;s<e.length;s++)o+=e[s].dataCount;for(s=0;s<this.dataList.length;s++)e=this.dataList[s],r.put(e.mode,4),r.put(e.getLength(),u.getLengthInBits(e.mode,t)),e.write(r);if(r.getLengthInBits()<=8*o)break}this.typeNumber=t}this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,e){this.moduleCount=4*this.typeNumber+17,this.modules=Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++){this.modules[r]=Array(this.moduleCount);for(var o=0;o<this.moduleCount;o++)this.modules[r][o]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),7<=this.typeNumber&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=s.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)},setupPositionProbePattern:function(t,e){for(var r=-1;7>=r;r++)if(!(-1>=t+r||this.moduleCount<=t+r))for(var o=-1;7>=o;o++)-1>=e+o||this.moduleCount<=e+o||(this.modules[t+r][e+o]=0<=r&&6>=r&&(0==o||6==o)||0<=o&&6>=o&&(0==r||6==r)||2<=r&&4>=r&&2<=o&&4>=o)},getBestMaskPattern:function(){for(var t=0,e=0,r=0;8>r;r++){this.makeImpl(!0,r);var o=u.getLostPoint(this);(0==r||t>o)&&(t=o,e=r)}return e},createMovieClip:function(t,e,r){for(t=t.createEmptyMovieClip(e,r),this.make(),e=0;e<this.modules.length;e++){r=1*e;for(var o=0;o<this.modules[e].length;o++){var s=1*o;this.modules[e][o]&&(t.beginFill(0,100),t.moveTo(s,r),t.lineTo(s+1,r),t.lineTo(s+1,r+1),t.lineTo(s,r+1),t.endFill())}}return t},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=0==t%2);for(t=8;t<this.moduleCount-8;t++)null==this.modules[6][t]&&(this.modules[6][t]=0==t%2)},setupPositionAdjustPattern:function(){for(var t=u.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var r=0;r<t.length;r++){var o=t[e],s=t[r];if(null==this.modules[o][s])for(var n=-2;2>=n;n++)for(var i=-2;2>=i;i++)this.modules[o+n][s+i]=-2==n||2==n||-2==i||2==i||0==n&&0==i}},setupTypeNumber:function(t){for(var e=u.getBCHTypeNumber(this.typeNumber),r=0;18>r;r++){var o=!t&&1==(e>>r&1);this.modules[Math.floor(r/3)][r%3+this.moduleCount-8-3]=o}for(r=0;18>r;r++)o=!t&&1==(e>>r&1),this.modules[r%3+this.moduleCount-8-3][Math.floor(r/3)]=o},setupTypeInfo:function(t,e){for(var r=u.getBCHTypeInfo(this.errorCorrectLevel<<3|e),o=0;15>o;o++){var s=!t&&1==(r>>o&1);6>o?this.modules[o][8]=s:8>o?this.modules[o+1][8]=s:this.modules[this.moduleCount-15+o][8]=s}for(o=0;15>o;o++)s=!t&&1==(r>>o&1),8>o?this.modules[8][this.moduleCount-o-1]=s:9>o?this.modules[8][15-o-1+1]=s:this.modules[8][15-o-1]=s;this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var r=-1,o=this.moduleCount-1,s=7,n=0,i=this.moduleCount-1;0<i;i-=2)for(6==i&&i--;;){for(var a=0;2>a;a++)if(null==this.modules[o][i-a]){var c=!1;n<t.length&&(c=1==(t[n]>>>s&1)),u.getMask(e,o,i-a)&&(c=!c),this.modules[o][i-a]=c,-1==--s&&(n++,s=7)}if(0>(o+=r)||this.moduleCount<=o){o-=r,r=-r;break}}}},s.PAD0=236,s.PAD1=17,s.createData=function(t,e,r){e=i.getRSBlocks(t,e);for(var o=new a,n=0;n<r.length;n++){var c=r[n];o.put(c.mode,4),o.put(c.getLength(),u.getLengthInBits(c.mode,t)),c.write(o)}for(n=t=0;n<e.length;n++)t+=e[n].dataCount;if(o.getLengthInBits()>8*t)throw Error("code length overflow. ("+o.getLengthInBits()+">"+8*t+")");for(o.getLengthInBits()+4<=8*t&&o.put(0,4);0!=o.getLengthInBits()%8;)o.putBit(!1);for(;!(o.getLengthInBits()>=8*t||(o.put(s.PAD0,8),o.getLengthInBits()>=8*t));)o.put(s.PAD1,8);return s.createBytes(o,e)},s.createBytes=function(t,e){for(var r=0,o=0,s=0,i=Array(e.length),a=Array(e.length),c=0;c<e.length;c++){var h=e[c].dataCount,l=e[c].totalCount-h;o=Math.max(o,h),s=Math.max(s,l),i[c]=Array(h);for(var d=0;d<i[c].length;d++)i[c][d]=255&t.buffer[d+r];for(r+=h,d=u.getErrorCorrectPolynomial(l),h=new n(i[c],d.getLength()-1).mod(d),a[c]=Array(d.getLength()-1),d=0;d<a[c].length;d++)l=d+h.getLength()-a[c].length,a[c][d]=0<=l?h.get(l):0}for(d=c=0;d<e.length;d++)c+=e[d].totalCount;for(r=Array(c),d=h=0;d<o;d++)for(c=0;c<e.length;c++)d<i[c].length&&(r[h++]=i[c][d]);for(d=0;d<s;d++)for(c=0;c<e.length;c++)d<a[c].length&&(r[h++]=a[c][d]);return r},e=4;for(var u={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;0<=u.getBCHDigit(e)-u.getBCHDigit(u.G15);)e^=u.G15<<u.getBCHDigit(e)-u.getBCHDigit(u.G15);return(t<<10|e)^u.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;0<=u.getBCHDigit(e)-u.getBCHDigit(u.G18);)e^=u.G18<<u.getBCHDigit(e)-u.getBCHDigit(u.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return u.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,r){switch(t){case 0:return 0==(e+r)%2;case 1:return 0==e%2;case 2:return 0==r%3;case 3:return 0==(e+r)%3;case 4:return 0==(Math.floor(e/2)+Math.floor(r/3))%2;case 5:return 0==e*r%2+e*r%3;case 6:return 0==(e*r%2+e*r%3)%2;case 7:return 0==(e*r%3+(e+r)%2)%2;default:throw Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new n([1],0),r=0;r<t;r++)e=e.multiply(new n([1,c.gexp(r)],0));return e},getLengthInBits:function(t,r){if(1<=r&&10>r)switch(t){case 1:return 10;case 2:return 9;case e:case 8:return 8;default:throw Error("mode:"+t)}else if(27>r)switch(t){case 1:return 12;case 2:return 11;case e:return 16;case 8:return 10;default:throw Error("mode:"+t)}else{if(!(41>r))throw Error("type:"+r);switch(t){case 1:return 14;case 2:return 13;case e:return 16;case 8:return 12;default:throw Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),r=0,o=0;o<e;o++)for(var s=0;s<e;s++){for(var n=0,i=t.isDark(o,s),a=-1;1>=a;a++)if(!(0>o+a||e<=o+a))for(var u=-1;1>=u;u++)0>s+u||e<=s+u||0==a&&0==u||i==t.isDark(o+a,s+u)&&n++;5<n&&(r+=3+n-5)}for(o=0;o<e-1;o++)for(s=0;s<e-1;s++)n=0,t.isDark(o,s)&&n++,t.isDark(o+1,s)&&n++,t.isDark(o,s+1)&&n++,t.isDark(o+1,s+1)&&n++,(0==n||4==n)&&(r+=3);for(o=0;o<e;o++)for(s=0;s<e-6;s++)t.isDark(o,s)&&!t.isDark(o,s+1)&&t.isDark(o,s+2)&&t.isDark(o,s+3)&&t.isDark(o,s+4)&&!t.isDark(o,s+5)&&t.isDark(o,s+6)&&(r+=40);for(s=0;s<e;s++)for(o=0;o<e-6;o++)t.isDark(o,s)&&!t.isDark(o+1,s)&&t.isDark(o+2,s)&&t.isDark(o+3,s)&&t.isDark(o+4,s)&&!t.isDark(o+5,s)&&t.isDark(o+6,s)&&(r+=40);for(s=n=0;s<e;s++)for(o=0;o<e;o++)t.isDark(o,s)&&n++;return r+10*(t=Math.abs(100*n/e/e-50)/5)}},c={glog:function(t){if(1>t)throw Error("glog("+t+")");return c.LOG_TABLE[t]},gexp:function(t){for(;0>t;)t+=255;for(;256<=t;)t-=255;return c.EXP_TABLE[t]},EXP_TABLE:Array(256),LOG_TABLE:Array(256)},h=0;8>h;h++)c.EXP_TABLE[h]=1<<h;for(h=8;256>h;h++)c.EXP_TABLE[h]=c.EXP_TABLE[h-4]^c.EXP_TABLE[h-5]^c.EXP_TABLE[h-6]^c.EXP_TABLE[h-8];for(h=0;255>h;h++)c.LOG_TABLE[c.EXP_TABLE[h]]=h;return n.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=Array(this.getLength()+t.getLength()-1),r=0;r<this.getLength();r++)for(var o=0;o<t.getLength();o++)e[r+o]^=c.gexp(c.glog(this.get(r))+c.glog(t.get(o)));return new n(e,0)},mod:function(t){if(0>this.getLength()-t.getLength())return this;for(var e=c.glog(this.get(0))-c.glog(t.get(0)),r=Array(this.getLength()),o=0;o<this.getLength();o++)r[o]=this.get(o);for(o=0;o<t.getLength();o++)r[o]^=c.gexp(c.glog(t.get(o))+e);return new n(r,0).mod(t)}},i.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],i.getRSBlocks=function(t,e){var r=i.getRsBlockTable(t,e);if(void 0==r)throw Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var o=r.length/3,s=[],n=0;n<o;n++)for(var a=r[3*n+0],u=r[3*n+1],c=r[3*n+2],h=0;h<a;h++)s.push(new i(u,c));return s},i.getRsBlockTable=function(t,e){switch(e){case 1:return i.RS_BLOCK_TABLE[4*(t-1)+0];case 0:return i.RS_BLOCK_TABLE[4*(t-1)+1];case 3:return i.RS_BLOCK_TABLE[4*(t-1)+2];case 2:return i.RS_BLOCK_TABLE[4*(t-1)+3]}},a.prototype={get:function(t){return 1==(this.buffer[Math.floor(t/8)]>>>7-t%8&1)},put:function(t,e){for(var r=0;r<e;r++)this.putBit(1==(t>>>e-r-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},"string"==typeof t&&(t={text:t}),t=r.extend({},{render:"canvas",width:256,height:256,typeNumber:-1,correctLevel:2,background:"#ffffff",foreground:"#000000"},t),this.each(function(){var e;if("canvas"==t.render){(e=new s(t.typeNumber,t.correctLevel)).addData(t.text),e.make();var o=document.createElement("canvas");o.width=t.width,o.height=t.height;for(var n=o.getContext("2d"),i=t.width/e.getModuleCount(),a=t.height/e.getModuleCount(),u=0;u<e.getModuleCount();u++)for(var c=0;c<e.getModuleCount();c++){n.fillStyle=e.isDark(u,c)?t.foreground:t.background;var h=Math.ceil((c+1)*i)-Math.floor(c*i),l=Math.ceil((u+1)*i)-Math.floor(u*i);n.fillRect(Math.round(c*i),Math.round(u*a),h,l)}}else for((e=new s(t.typeNumber,t.correctLevel)).addData(t.text),e.make(),o=r("<table></table>").css("width",t.width+"px").css("height",t.height+"px").css("border","0px").css("border-collapse","collapse").css("background-color",t.background),n=t.width/e.getModuleCount(),i=t.height/e.getModuleCount(),a=0;a<e.getModuleCount();a++)for(u=r("<tr></tr>").css("height",i+"px").appendTo(o),c=0;c<e.getModuleCount();c++)r("<td></td>").css("width",n+"px").css("background-color",e.isDark(a,c)?t.foreground:t.background).appendTo(u);e=o,jQuery(e).appendTo(this)})}},ZcBw:function(t,e){},cq1D:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});r("aozt");var o=r("LPk9"),s=r("0R/d"),n=r("9woI"),i=r.n(n),a={data:function(){return{keyShow:!1,keyInfo:"",keyStoreInfo:[],newAccountAddress:""===this.$route.params.address?localStorage.getItem("newAccountAddress"):this.$route.params.address,codeShowOk:!1,newOk:this.$route.params.newOk,keyDialogVisible:!1,inputKey:""}},components:{Back:o.a,CodeBar:s.a},mounted:function(){},methods:{accountCopy:function(t){i()(t),this.$message({message:this.$t("message.c129"),type:"success",duration:"800"})},backupsKeyStore:function(){var t='{"password":"'+localStorage.getItem("userPass")+'"}';this.getKeyStore("/account/export/"+this.newAccountAddress,t)},getKeyStore:function(t,e){var r=this;this.$post(t,e).then(function(t){if(t.success){var e='{"address":"'+t.data.address+'","encryptedPrivateKey":"'+t.data.encryptedPrivateKey+'","alias":"'+t.data.alias+'","pubKey":"'+t.data.pubKey+'","prikey":"'+t.data.prikey+'"}',o=new Blob([e]),s=r.newAccountAddress+".keystore";if("download"in document.createElement("a")){var n=document.createElement("a");n.download=s,n.style.display="none",n.href=URL.createObjectURL(o),document.body.appendChild(n),n.click(),URL.revokeObjectURL(n.href),document.body.removeChild(n)}else navigator.msSaveBlob(o,s)}else r.$message({type:"warning",message:r.$t("message.passWordFailed")+t.msg,duration:"800"})})},download:function(t){if(t){var e=window.URL.createObjectURL(new Blob([t])),r=document.createElement("a");r.style.display="none",r.href=e,r.setAttribute("download","123456.keystore"),document.body.appendChild(r),r.click()}},backupsKey:function(){this.keyDialogVisible=!0;var t='{"password":"'+localStorage.getItem("userPass")+'"}';this.getPrikey("/account/prikey/"+this.newAccountAddress,t)},getPrikey:function(t,e){var r=this;this.$post(t,e).then(function(t){t.success?r.inputKey=t.data.value:r.$message({type:"warning",message:r.$t("message.passWordFailed")+t.msg,duration:"800"})})},newSubmit:function(){var t=this;this.$confirm(this.$t("message.c110"),this.$t("message.c86"),{confirmButtonText:this.$t("message.c111"),cancelButtonText:this.$t("message.c112")}).then(function(){"0"===localStorage.getItem("fastUser")?t.$router.push({path:"/wallet"}):t.$router.push({path:"/wallet/users/userInfo"})})},newReset:function(){this.$router.push({path:"/wallet"})}}},u={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"new-account"},[r("Back",{directives:[{name:"show",rawName:"v-show",value:!t.newOk,expression:"!newOk"}],attrs:{backTitle:this.$t("message.accountManagement")}}),t._v(" "),r("div",{staticClass:"new-account-top"},[r("h1",{directives:[{name:"show",rawName:"v-show",value:t.newOk,expression:"newOk"}]},[t._v(" "+t._s(t.$t("message.newAccountTitle")))]),t._v(" "),r("h2",[t._v("\n      "+t._s(t.$t("message.newAccountAddress"))+"："),r("span",[t._v(t._s(this.newAccountAddress))]),t._v(" "),r("i",{staticClass:"copy_icon cursor-p",attrs:{title:t.$t("message.c143")},on:{click:function(e){t.accountCopy(t.newAccountAddress)}}})])]),t._v(" "),r("div",{staticClass:"keystore cursor-p",on:{click:t.backupsKeyStore}},[r("span",[t._v(t._s(t.$t("message.c181")))]),t._v(" "),r("label",[t._v(t._s(t.$t("message.c182"))),r("br"),t._v(t._s(t.$t("message.c183")))])]),t._v(" "),r("div",{staticClass:"key text-d cursor-p",on:{click:t.backupsKey}},[t._v(t._s(t.$t("message.c184")))]),t._v(" "),r("el-dialog",{attrs:{title:"",visible:t.keyDialogVisible,width:"45%",center:""},on:{"update:visible":function(e){t.keyDialogVisible=e}}},[r("div",{staticClass:"key-dialog"},[r("h1",[t._v(t._s(t.$t("message.c185")))]),t._v(" "),r("p",[t._v(t._s(t.$t("message.c186"))),r("br"),t._v(t._s(t.$t("message.c187"))),r("br"),t._v(t._s(t.$t("message.c188")))]),t._v(" "),r("div",{staticClass:"key-info"},[t._v("\n        "+t._s(this.inputKey)+"\n      ")]),t._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(e){t.accountCopy(t.inputKey)}}},[t._v(t._s(t.$t("message.c143")))])],1)]),t._v(" "),r("div",{staticClass:"cl new-bt"},[r("el-button",{staticClass:"new-submit",attrs:{type:"primary"},on:{click:function(e){t.newSubmit()}}},[t._v(t._s(t.$t("message.newAccountSubmit"))+"\n    ")]),t._v(" "),r("el-button",{directives:[{name:"show",rawName:"v-show",value:t.newOk,expression:"newOk"}],staticClass:"new-reset",attrs:{type:"primary"},on:{click:function(e){t.newReset()}}},[t._v("\n      "+t._s(t.$t("message.newAccountReset"))+"\n    ")])],1)],1)},staticRenderFns:[]};var c=r("vSla")(a,u,!1,function(t){r("ZcBw")},null,null);e.default=c.exports}});