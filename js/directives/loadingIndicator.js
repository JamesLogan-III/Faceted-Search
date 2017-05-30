JobsApp.directive('loadingIndicator', function() {
    return {
        restrict: 'C',
        template: '<div class="spinner"><h4>Loading Career Opportunities ... </h4><div class="rect1"></div>&nbsp;<div class="rect2"></div>&nbsp;<div class="rect3"></div>&nbsp;<div class="rect4"></div>&nbsp;<div class="rect5"></div></div>',
        link: function(scope, element, attrs) {
            scope.$on('scope-data-loading-started', function(e) {
                element.css({ "display": "", "visibility": "" });
                //console.log('-------------- FloorplanApp.directive  loadingIndicator On -------------');
            });
            scope.$on('scope-data-loading-complete', function(e) {
                element.css({ "display": "none", "visibility": "hidden" });
                //console.log('--------------***************** FloorplanApp.directive  loadingIndicator Off *************--------------');
            });
        }
    };
});