
var expect = require('chai').expect;
var tester = require('gitbook-tester');
var fs = require('fs');

describe('GitBook build', () => {
  beforeEach(() => {
    try {
      fs.unlinkSync('output.json')
    } catch (e) {}
  });

  it('should create JSON content', () =>
    tester.builder()
      .withContent('# Hello\nHello, world!')
      .withBookJson({ plugins: ['json'] })
      .create()
      .then(() => {
        var json = JSON.parse(fs.readFileSync('output.json'));
        expect(json).to.eql([
          {
            title: 'Hello',
            heading: 'h1',
            content: '\n<p>Hello, world!</p>\n',
            path: 'README.md'
          }
        ]);
      })
    );
});
