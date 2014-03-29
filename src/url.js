define(function(require, exports, module) {

  //             2.protocol  4.username 5.password 7.hostname     8.port     9.path    10.query 11.hash
  //                    |           |       |           |            |          |           |       |
  //                 ------       -----  ------    -----------     -----    ----------- --------- -----
  var RE_URL = /^((?:(\w+:)\/\/)?((\w+):?(\w+)?@)?(([^\/\?:]+)(?:\:(\d+))?))(\/[^\?#]+)?(\?[^#]+)?(#.*)?/;
  //             -----------------------------------------------------------
  //                                |             -------------------------
  //                            1.origin                    |
  //                                                    6.host
  var DEFAULT_PORT = {
    "ftp:":    "21",
    "ssh:":    "22",
    "telnet:": "23",
    "smtp:":   "25",
    "http:":   "80",
    "pop3:":   "109",
    "https:":  "443",
    "mms:":    "1755"
  };

  var Url = function(url){
    var u = RE_URL.exec(url);

    this.uri = url;
    this.origin = u[1];
    this.protocol = u[2];
    //! URI已解码的授权组成部分，未实现。
    this.authority;
    this.username = u[4];
    this.password = u[5];
    this.host = u[6];
    this.hostname = u[7];
    this.port = u[8] || DEFAULT_PORT[this.protocol] || "";
    this.path = u[9] || "/";
    this.query = u[10] || "";
    this._query = parseQuery(this.query);
    this.fragment = u[11] || "";
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

  // make querystring from object.
  // @param {Object} object, key:value pair object.
  // @return {String}
  function makeQueryString(object){
    var query = [];
    for(var key in object){
      if(!object.hasOwnProperty(key)){continue;}
      var _key = encodeURIComponent(key);
      var values = object[key];
      if(isArray(values)){
        for(var i=0,l=values.length; i<l; i++){
          query.push(_key + '=' + encodeURIComponent(values[i]));
        }
      }else{
        query.push(_key + '=' + encodeURIComponent(values));
      }
    }
    return (query.length === 0 ? '' : '?') + query.join('&');
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
      this._query[name] = this._query[name].concat(value);
    }else{
      this._query[name] = value;
    }
    this.query = makeQueryString(this._query);
    return this;
  };

  // Clear all param datas.
  // @return {Url} this.
  Url.prototype.clearParams = function(){
    this._query = {};
    this.query = makeQueryString(this._query);
    return this;
  };

  Url.prototype.toString = function(){
    return this.protocol + '//' +
      (this.username ? this.username + ':' + this.password + '@' : '') +
      this.host +
      // default port donot print.
      (this.port && !DEFAULT_PORT.hasOwnProperty(this.protocol) &&
        DEFAULT_PORT[this.protocol] !== this.port ?
        ':' + this.port : '') +
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
