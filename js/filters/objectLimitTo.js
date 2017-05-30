JobsApp.filter('objLimitTo', [function() {
    return function(obj, limit) {
        //console.log("obj = " + obj);
        var keys = Object.keys(obj);
        if (keys.length < 1) return [];

        var ret = new Object();
        var count = 0;
        angular.forEach(keys, function(key, arrayIndex) {
            if (count >= limit) return false;
            ret[key] = obj[key];
            count++;
        });
        return ret;
    };
}]);