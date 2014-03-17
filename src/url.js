define(function(require, exports, module) {

  //                protocol   username password    host         port     path        query   hash
  //                   |           |       |          |            |        |           |       |
  //                ------       -----  ------   -----------     -----  ----------- --------- -----
  var RE_URL = /^(?:(\w+:)\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+)(?:\:(\d+))?(\/[^\?#]+)?(\?[^#]+)?(#.*)?/;
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

  // Get param, if has more than one, return the first one.
  // if has no-one, return null.
  //
  // @param {String} key, param name.
  // @return {String, null}
  Url.prototype.getParam = function(key){
    return this._query.hasOwnProperty(key) ? this._query[key][0] : null;
  };

  // Get params if has more than one.
  // @param {String} key, param name.
  // @return {Array} params.
  Url.prototype.getParams = function(key){
    return this._query.hasOwnProperty(key) ? this._query[key] : [];
  };

  // Delete param.
  // TODO: delete spec name and values param.
  // @param {String} name, param name.
  // @return {Url} this.
  Url.prototype.delParam = function(name){
    try{
      delete this._query[name];
      this.query = makeQueryString(this._query);
    }catch(ex){}
    return this;
  };

  // Add or replace params.
  // @param {String} name, param name.
  // @param {String} value, param values.
  // @return {Url} this.
  Url.prototype.setParam = function(name, value){
    if(!isArray(value)){value = [value];}
    this._query[name] = value;
    this.query = makeQueryString(this._query);
    return this;
  };

  // Add params.
  // @param {String} name, param name.
  // @param {String,Array} value, param values.
  // @return {Url} this.
  Url.prototype.addParam = function(name, value){
    if(!isArray(value)){value = [value];}
    if(this._query.hasOwnProperty(name)){
      this._query[name].concat(value);
    }else{
      this._query[name] = value;
    }
    return this;
  };

  function makeQueryString(object){
    var query = [];
    for(var key in object){
      if(!object.hasOwnProperty(key)){continue;}
      query.push(encodeURIComponent(key) + '=' + encodeURIComponent(object[key]));
    }
    return '?' + query.join('&');
  }

  Url.prototype.toString = function(){
    return this.protocol + '//' +
      (this.username ? this.username + ':' + this.password + '@' : '') +
      this.host + (this.port ? ':' + this.port : '') +
      this.path + makeQueryString(this._query) + this.fragment;
  };

  Url.verify = function(uri){
    return RE_URL.test(uri);
  };

  function isArray(object){
    return Object.prototype.toString.call(object) === "[object Array]";
  }


  module.exports = Url;

});
