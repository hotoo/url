define(function(require) {

  var Url = require('url');
  var expect = require("expect");

  describe('url', function() {

    it('normal usage', function() {

      var url = new Url("http://www.google.com/path/to/index.html?q=a&u=b&q=c#hash");
      expect(url.protocol).to.equal("http:");
      expect(url.host).to.equal("www.google.com");
      expect(url.path).to.equal("/path/to/index.html");
      expect(url.query).to.equal("?q=a&u=b&q=c");
      expect(url.getParam("q")).to.equal("a");
      expect(url.getParam("u")).to.equal("b");
      expect(url.getParams("q").join(", ")).to.equal("a, c");

    });
  });

});
