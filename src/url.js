define(function(require, exports, module) {

  var RE_URL = /^(?:(\w+:)\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?(\?[^#]+)?(#\w+)?/;
  var DEFAULT_PORT = {
    ftp:21,
    ssh:22,
    telnet:23,
    smtp:25,
    http:80,
    pop3:109,
    https:443,
    mms:1755
  };

  var Url = function(url){
    var u = RE_URL.exec(url);

    this.uri = url;
    //! URI已解码的授权组成部分，未实现。
    this.authority;
    this.protocol = u[1];
    this.username = u[3];
    this.password = u[4];
    this.host = u[5];
    this.port = u[6];
    this.path = u[7];
    this.query = u[8];
    this._query = parseQuery(u[8]);
    this.fragment = u[9];
  };

  function parseQuery(query){
    var q = "?";
    var eq = "=";
    var and = "&";

    var rst = {};

    if(!query){return rst;}

    query = query.replace(/^\?/, "");
    var list = query.split(and);

    for(var i=0,eqi,pair,key,val,l=list.length; i<l; i++){
      pair = list[i];
      eqi = pair.indexOf(eq);
      key = decodeURIComponent(pair.substring(0, eqi)) || "";
      val = decodeURIComponent(pair.substring(eqi+1)) || "";

      if(!rst.hasOwnProperty(key)){
        rst[key] = [val];
      }else{
        rst[key].push(val);
      }
    }

    return rst;
  }

  Url.prototype.getParam = function(key){
    return this._query.hasOwnProperty(key) ? this._query[key][0] : null;
  };
  Url.prototype.getParams = function(key){
    return this._query.hasOwnProperty(key) ? this._query[key] : null;
  };
  Url.verify = function(uri){
    return RE_URL.test(uri);
  };


  module.exports = Url;

});
