// make sure require('insert-css')

var stylus = require('stylus');
var es = require('event-stream');
var util = require('util');

module.exports = stylusify;

var opts = {
    compress: true,
    linenos: false,
    errors: true,
    use: [],
    import: []
};

function stylusify(file, options) {


    if (!/\.styl$/.test(file)) {
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
            this.emit('test', 'test');
            this.queue(render());
            this.queue(null);
        });


    function render() {

        var styl = stylus(data, opts);

        if (opts.use.length) {
            opts.use.forEach(function (item) {
                styl.use(item);
            })
        }

        if (opts.import.length) {
            opts.import.forEach(function (item) {
                styl.import(item);
            })
        }


        return ['require("insert-css")(', styl.render(), ");"].join('\'');
    }


}