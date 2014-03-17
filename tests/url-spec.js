define(function(require) {

  var Url = require('url');
  var expect = require("expect");

  describe('url', function() {

    var tests_constructor = [
      ["http://www.example.com", {
        protocol: "http:",
        host: "www.example.com",
        port: "80",
        path: "/",
        query: "",
        fragment: ""
      }],
      ["http://www.example.com/", {
        protocol: "http:",
        host: "www.example.com",
        port: "80",
        path: "/",
        query: "",
        fragment: ""
      }],
      ["https://www.example.com/path/to/page.html", {
        protocol: "https:",
        host: "www.example.com",
        port: "443",
        path: "/path/to/page.html",
        query: "",
        fragment: ""
      }],
      ["http://www.example.com:8080/path/to/page.html?abc=A1&abc=A2", {
        protocol: "http:",
        host: "www.example.com",
        port: "8080",
        path: "/path/to/page.html",
        query: "?abc=A1&abc=A2",
        fragment: ""
      }],
      ["http://user@www.example.com:8080/path/to/page.html?abc=A1&abc=A2#hash", {
        protocol: "http:",
        username: "user",
        password: undefined,
        host: "www.example.com",
        port: "8080",
        path: "/path/to/page.html",
        query: "?abc=A1&abc=A2",
        fragment: "#hash"
      }],
      ["http://user:pass@www.example.com:8080/path/to/page.html?abc=A1&abc=A2#hash", {
        protocol: "http:",
        username: "user",
        password: "pass",
        host: "www.example.com",
        port: "8080",
        path: "/path/to/page.html",
        query: "?abc=A1&abc=A2",
        fragment: "#hash"
      }],
    ];

    tests_constructor.forEach(function(item, index){

      var u = item[0];
      var r = item[1];
      it('constructor: '+u, function() {

        var url = new Url(u);
        expect(url.protocol).to.equal(r.protocol);
        expect(url.username).to.equal(r.username);
        expect(url.password).to.equal(r.password);
        expect(url.host).to.equal(r.host);
        expect(url.port).to.equal(r.port);
        expect(url.path).to.equal(r.path);
        expect(url.query).to.equal(r.query);
        expect(url.fragment).to.equal(r.fragment);

      });

    });

    it('get param', function() {

      var url = new Url("http://www.example.com/path/to/index.html?q=a&u=b&q=c#hash");
      expect(url.getParam("q")).to.equal("a");
      expect(url.getParam("u")).to.equal("b");

    });

    it('get params', function() {

      var url = new Url("http://www.example.com/path/to/index.html?q=a&u=b&q=c#hash");
      var params_q = url.getParams("q");
      expect(params_q.length).to.equal(2);
      expect(params_q[0]).to.equal("a");
      expect(params_q[1]).to.equal("c");

      var params_u = url.getParams("u");
      expect(params_u.length).to.equal(1);
      expect(params_u[0]).to.equal("b");

      var params_x = url.getParams("x");
      expect(params_x.length).to.equal(0);
      expect(params_x[0]).to.equal(undefined);

    });

    it('delete param', function() {

      var url = new Url("http://www.google.com/path/to/index.html?q=a&u=b&q=c#hash");
      expect(url.getParam("q")).to.equal("a");
      url.delParam("q");
      expect(url.getParam("q")).to.equal(null);

    });

    it('set param (add or replace param).', function() {

      var url = new Url("http://www.google.com/path/to/index.html?q=a&u=b&q=c#hash");
      expect(url.getParam("q")).to.equal("a");
      url.setParam("q", "QQQ");
      expect(url.getParam("q")).to.equal("QQQ");

      expect(url.getParam("x")).to.equal(null);
      url.setParam("x", "XXX");
      expect(url.getParam("x")).to.equal("XXX");

    });

    it('add param', function() {

      var url = new Url("http://www.google.com/path/to/index.html?q=a&u=b&q=c#hash");
      var params_q = url.getParams("q");
      expect(params_q.length).to.equal(2);
      expect(params_q[0]).to.equal("a");
      expect(params_q[1]).to.equal("c");

      url.addParam("q", "QQQ");
      var params_Q = url.getParams("q");
      expect(params_Q.length).to.equal(3);
      expect(params_Q[0]).to.equal("a");
      expect(params_Q[1]).to.equal("c");
      expect(params_Q[2]).to.equal("QQQ");

      url.addParam("q", ["XXX", "YYY", "ZZZ"]);
      var params_z = url.getParams("q");
      expect(params_z.length).to.equal(6);
      expect(params_z[0]).to.equal("a");
      expect(params_z[1]).to.equal("c");
      expect(params_z[2]).to.equal("QQQ");
      expect(params_z[3]).to.equal("XXX");
      expect(params_z[4]).to.equal("YYY");
      expect(params_z[5]).to.equal("ZZZ");

    });

    it('clear param', function() {
      var url = new Url("http://www.google.com/path/to/index.html?q=a&u=b&q=c#hash");
      expect(url.getParams("q").length).to.equal(2);
      expect(url.getParams("u").length).to.equal(1);
      url.clearParams();
      expect(url.getParams("q").length).to.equal(0);
      expect(url.getParams("u").length).to.equal(0);
    });

  });

});
