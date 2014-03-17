define("hotoo/url/1.0.0/url",[],function(a,b,c){function d(a){var b="=",c="&",d={};if(!a)return d;a=a.replace(/^\?/,"");for(var e,f,g,h,i=a.split(c),j=0,k=i.length;k>j;j++)f=i[j],e=f.indexOf(b),g=decodeURIComponent(f.substring(0,e))||"",h=decodeURIComponent(f.substring(e+1))||"",d.hasOwnProperty(g)?d[g].push(h):d[g]=[h];return d}function e(a){var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(encodeURIComponent(c)+"="+encodeURIComponent(a[c]));return"?"+b.join("&")}function f(a){return"[object Array]"===Object.prototype.toString.call(a)}var g=/^(?:(\w+:)\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+)(?:\:(\d+))?(\/[^\?#]+)?(\?[^#]+)?(#.*)?/,h=function(a){var b=g.exec(a);this.uri=a,this.authority,this.protocol=b[1],this.username=b[3],this.password=b[4],this.host=b[5],this.port=b[6],this.path=b[7],this.query=b[8],this._query=d(b[8]),this.fragment=b[9]};h.prototype.getParam=function(a){return this._query.hasOwnProperty(a)?this._query[a][0]:null},h.prototype.getParams=function(a){return this._query.hasOwnProperty(a)?this._query[a]:[]},h.prototype.delParam=function(a){try{delete this._query[a],this.query=e(this._query)}catch(b){}return this},h.prototype.setParam=function(a,b){return f(b)||(b=[b]),this._query[a]=b,this.query=e(this._query),this},h.prototype.addParam=function(a,b){return f(b)||(b=[b]),this._query.hasOwnProperty(a)?this._query[a].concat(b):this._query[a]=b,this},h.prototype.toString=function(){return this.protocol+"//"+(this.username?this.username+":"+this.password+"@":"")+this.host+(this.port?":"+this.port:"")+this.path+e(this._query)+this.fragment},h.verify=function(a){return g.test(a)},c.exports=h});