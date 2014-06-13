var jade = require('jade');
var es = require('event-stream');
var util = require('util');

module.exports = jadify;

var opts = {
    pretty: false
};

function jadify(file, options) {

    if (!/\.jade/.test(file)) {
        return es.through();
    }

    options = options || {};

    util._extend(opts, options);

    var data = '';

    return es.through(
        function (buf) {
            data += buf;
        },
        function () {
            this.queue(render());
            this.queue(null);
        });

    function render() {
        return ['module.exports=', escapeContent(jade.render(data, opts)), ";"].join('\'');
    }

    function escapeContent(content) {
        return content.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
    }

}