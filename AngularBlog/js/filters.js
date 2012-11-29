angular.module('myApp.filters', []).filter('interpolate', [
    'version', 
    function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/gm, version);
        }
    }
]);
