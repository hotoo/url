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
    ];

    tests_constructor.forEach(function(item, index){

      var u = item[0];
      var r = item[1];
      it('constructor: '+u, function() {

        var url = new Url(u);
        expect(url.protocol).to.equal(r.protocol);
        expect(url.host).to.equal(r.host);
        expect(url.path).to.equal(r.path);
        expect(url.query).to.equal(r.query);

      });

    });

    it('advance usage', function() {

      var url = new Url("http://www.google.com/path/to/index.html?q=a&u=b&q=c#hash");
      url.delParam("q");
      expect(url.getParam("q")).to.equal(null);

    });

    it('set param (add or replace param).', function() {

      var url = new Url("http://www.google.com/path/to/index.html?q=a&u=b&q=c#hash");
      url.setParam("q", "QQQ");
      expect(url.getParam("q")).to.equal("QQQ");

    });

  });

});
