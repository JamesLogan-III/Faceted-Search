JobsApp.filter('spaceless', function() {
    return function(input) {
        if (input) {
            return input.replace(/\s+/g, '-');
        }
    }
});