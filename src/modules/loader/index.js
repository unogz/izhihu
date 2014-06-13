var HOST = 'http://127.0.0.1:3000';

var $script = require('scriptjs');


$script([
    HOST + '/lib/jquery.js',
    HOST + '/lib/purl.js'
], function () {

    console.log('iZhihu init');
});