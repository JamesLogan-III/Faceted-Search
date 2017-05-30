   // Generic unique array maker, takes array and a function returning the Key Name to build a unique array
   var uniqueBy = function(array, fn) {
       var unique = {};
       var distinct = [];
       array.forEach(function(x) {
           var key = fn(x);
           if (!unique[key]) {
               distinct.push(key);
               unique[key] = true;
           }
       });
       return distinct;
   };

   //for each element in filtersArray call assembleFacetedJobsArray concat the arrays and then apply the filter.
   var filterCollection = function(filtersArray, arrayToFilter) {
       var out = [];
       filtersArray.forEach(function(x) {
           if (x.Field == "location.city") {
               out = out.concat(out, filterJobsArray(arrayToFilter, function(x) { return x.location.city; }, x.Value.split(" - ")[1]));
           } else if (x.Field == "department.label") {
               out = out.concat(out, filterJobsArray(arrayToFilter, function(x) { return x.department.label; }, x.Value));
           } else if (x.Field == "typeOfEmployment.label") {
               out = out.concat(out, filterJobsArray(arrayToFilter, function(x) { return x.typeOfEmployment.label; }, x.Value));
           } else if (x.Field == "experienceLevel.label") {
               out = out.concat(out, filterJobsArray(arrayToFilter, function(x) { return x.experienceLevel.label; }, x.Value));
           }
       });
       return arrayDedupe(out, "id").sort(function(a, b) {
           return (a.releasedDate > b.releasedDate) ? -1 : ((a.releasedDate < b.releasedDate) ? 1 : 0);
       });
   };

   // remove duplicates from array by passed key, usually the job ID
   var arrayDedupe = function(array, keyname) {
       var output = [],
           keys = [];
       angular.forEach(array, function(item) {
           var key = item[keyname];
           if (keys.indexOf(key) === -1) {
               keys.push(key);
               output.push(item);
           }
       });
       return output;
   };

   // Apply filter to array, takes a function that returns the key to check the value
   var filterJobsArray = function(array, fn, value) {
       var data = [];
       // execute the filter    
       array.forEach(function(x) {
           var key = fn(x);
           if (key === value) {
               data.push(x);
           }
       });
       return data;
   };

   // find object by ID 
   var findById = function(array, key, value) {
       // Generic Array value retriver 
       for (var i = 0; i < array.length; i++) {
           if (array[i][key] === value) {
               return array[i];
           }
       }
       return null;
   };

   // Get index of object by value, used for removing facets
   var findObjectIndexByValue = function(array, attr, value) {
       for (var i = 0; i < array.length; i += 1) {
           if (array[i][attr] === value) {
               return i;
           }
       }
       return -1;
   };