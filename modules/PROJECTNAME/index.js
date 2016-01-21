// jquery plugins are not all used to CommonJS or AMD
window.$ = window.jQuery = require('jquery');

if (!Modernizr.es6object || !Modernizr.mutationobserver) {
    require(['babel-polyfill', 'mutation-observer'], () => {
        window.MutationObserver = require('mutation-observer');
        require('./elements')
    });
} else {
    require('./elements')
}