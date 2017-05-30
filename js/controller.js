'use strict';
JobsApp.controller('JobsController', function($scope, $log, $q, filterFilter, job, ISO3166, ENV, $analytics) {
    //config Variable initialization
    $scope.companyName = ENV.company.name;
    $scope.companyCode = ENV.company.code;
    $scope.companyURL = ENV.company.URL;
    $scope.companyImageURL = ENV.company.imageURL;
    $scope.jobShowLimit = ENV.jobShowLimit;
    $scope.undefinedJobTypeLabel = ENV.undefinedJobTypeLabel;
    $scope.undefinedJobFunctionLabel = ENV.undefinedJobFunctionLabel;
    $scope.limitCity = ENV.limitCity;
    $scope.limitDepartment = ENV.limitDepartment;

    // These are the flags for hiding the more links when a limit exceeds the count of the refiner 
    $scope.moreCity = true;
    $scope.moreDepartment = true;

    // initialize the app
    $scope.init = function() {
        $scope.$broadcast('scope-data-loading-started');
        $log.debug('init Start');
        $scope.jobs = [];
        $scope.selectedFilterValues = [];
        $scope.firstFacet = "";
        var loadCount = function() {
                return job.getJobsMeta(); // Request #1 sets number of requests
            },
            parallelLoad = function(fetchCount) {
                // Set the JobCount and Execute other requests in parallel...                
                $scope.jobCount = fetchCount;
                return job.getJobsData(fetchCount);
            },
            reportProblems = function(fault) {
                $log.error(String(fault));
            },
            assembleData = function() {
                // $scope.jobs = job.jobList.content; // Response Handler #2
                // Find undefined and reset to the undefined label value object, this helps with object limiting for the location and job function              
                angular.forEach(job.jobList.content, function(job) {
                    if (typeof job.department.label == 'undefined') {
                        var departmentObject = { id: "000000", label: $scope.undefinedJobFunctionLabel };
                        job.department = departmentObject;
                    }
                    if (typeof job.typeOfEmployment.label == 'undefined') {
                        var typeOfJob = { label: $scope.undefinedJobTypeLabel };
                        job.typeOfEmployment = typeOfJob;
                    }
                    $scope.jobs.push(job);
                });
                // initialize the filtered and faceted Jobs arrays with all Jobs
                $scope.facetedJobs = $scope.jobs;
                $scope.filteredJobs = $scope.jobs;
                // counts of unique departments and locations
                $scope.selectDepartmentLength = uniqueBy($scope.jobs, function(x) { return x.department.label; }).length;
                $scope.selectCityLength = uniqueBy($scope.jobs, function(x) { return x.location.city; }).length;
                $scope.$broadcast('scope-data-loading-complete');
            };

        // 3-easy steps to load and then assemble all of our information using a promise chain
        loadCount()
            .then(parallelLoad)
            .then(assembleData)
            .catch(reportProblems);
    };

    // Apply all Facets and filters in the $scope.selectedFilterValues array to create the filteredJobs Array. 
    $scope.applyFilters = function() {
        // Get first Facet
        $scope.firstFacet = $scope.selectedFilterValues[0].Field;
        $scope.secondFacet = '';
        $scope.thirdFacet = '';
        $scope.fourthFacet = '';

        //get all instances of firstFacet from selectedFilterValues
        var facetsToFilter = $scope.selectedFilterValues.filter(function(el) {
            return (el.Field == $scope.firstFacet);
        });

        // filter the first facet
        var TempFilter = filterCollection(facetsToFilter, $scope.jobs);

        // set facetedJobs before filtering
        $scope.facetedJobs = TempFilter; // this allows us to keep the filter and counts available  

        //get everything that is an active filter and not a facet
        var filtersToApply = $scope.selectedFilterValues.filter(function(el) {
            return (el.Field !== $scope.firstFacet);
        });

        if (filtersToApply.length > 0) {
            $scope.secondFacet = filtersToApply[0].Field;
            var filtersToApplyTwo = $scope.selectedFilterValues.filter(function(el) {
                return (el.Field == $scope.secondFacet);
            });
            // filter the second facet
            var secondFilterArray = filterCollection(filtersToApplyTwo, TempFilter);

            //check for a third facet
            var filtersToApplyThird = $scope.selectedFilterValues.filter(function(el) {
                return (el.Field !== $scope.firstFacet && el.Field !== $scope.secondFacet);
            });
            if (filtersToApplyThird.length > 0) {
                $scope.thirdFacet = filtersToApplyThird[0].Field;
                var thirdFilterArray = filterCollection(filtersToApplyThird, secondFilterArray);

                //check for a fourth facet
                var filtersToApplyFourth = $scope.selectedFilterValues.filter(function(el) {
                    return (el.Field !== $scope.firstFacet && el.Field !== $scope.secondFacet && el.Field !== $scope.thirdFacet);
                });

                if (filtersToApplyFourth.length > 0) {
                    $scope.fourthFacet = filtersToApplyThird[0].Field;
                    var fourthFilterArray = filterCollection(filtersToApplyFourth, thirdFilterArray);
                    $scope.filteredJobs = fourthFilterArray;
                } else {
                    $scope.filteredJobs = thirdFilterArray;
                }
            } else {
                $scope.filteredJobs = secondFilterArray;
            }
        } else {
            $scope.filteredJobs = TempFilter;
        }
    };

    // utility function to get country name from code used in SmartRecruiters
    $scope.getCountryName = function(index) {
        return ISO3166.getCountryName(index.location.country.toUpperCase());
    };

    //Return the proper array of jobs for ng-repeat in filter selectors, return the filtered array unless it is the first facet or no first facet exists 
    $scope.getList = function(field) {
        //console.log("getList Field = " + field);
        if ($scope.firstFacet == "" || $scope.firstFacet == field) {
            //first facet is empty or matches field
            return $scope.jobs;
        } else if ($scope.secondFacet == field) {
            return $scope.facetedJobs;
        } else {
            return $scope.filteredJobs;
        }
    };

    // Add a facet if it does not already exist, remove if it does exist
    $scope.addFacet = function(field, value) {
        if (field == 'location.city') {
            // convert the country code to name for label and put them back together
            value = ISO3166.getCountryName(value.split("~")[0].toUpperCase()) + " - " + value.split("~")[1];
        }
        var filterExists = findById($scope.selectedFilterValues, 'Value', value);
        var facet = { Field: field, Value: value };
        //check for facet already applied
        if (filterExists !== null) {
            $scope.clearFacet(facet);
        } else {
            // Add the filter to the selectedFilterValues array, call ApplyFilters            
            $scope.selectedFilterValues.push(facet);
            $scope.applyFilters();
        }
        // Log GA event for the selected facet and value
        $analytics.eventTrack(field, { category: field, label: value });
    };

    // Boolean, check if exists function
    $scope.checkFacet = function(field, value) {
        var val = findById($scope.selectedFilterValues, field, value);
        //console.log("val = " + val);
        if (val == null) {
            return false;
        } else {
            return true;
        }
    };

    // Reset all filteredJobs to the original(full) Jobs Array, empty the Filters array and reset the firstFacet Value to empty.
    $scope.clearAllFacets = function() {
        $scope.filteredJobs = $scope.jobs;
        $scope.selectedFilterValues = [];
        $scope.firstFacet = "";
        // uncheck the checkboxes
        $('input:checkbox').removeAttr('checked');
        //reset the ShowMore Links on filters
        $scope.limitCity = ENV.limitCity;
        $scope.moreCity = true;
        $scope.limitDepartment = ENV.limitDepartment;
        $scope.moreDepartment = true; //change More Link
    };

    // Clear a single facet when passed a facet
    $scope.clearFacet = function(facet) {
        // Find the index of the facet so we can remove it from the active facets.
        var i = findObjectIndexByValue($scope.selectedFilterValues, 'Value', facet.Value);
        // If it exists, remove the facet from the list of active facets.
        if (i != -1) {
            // remove the item from the Facet array
            $scope.selectedFilterValues.splice(i, 1);
            if (!$scope.selectedFilterValues.length) {
                // $scope.selectedFilterValues is empty reset all
                $scope.clearAllFacets();
            } else {
                //still some facets active, apply filters uncheck checkboxes
                var idValue = facet.Value;
                if (facet.Field == 'location.city') {
                    var cleanCountry = facet.Value.replace(' - ', '~');
                    var cleanCountryCode = ISO3166.getCountryCode(cleanCountry.split('~')[0]).toLowerCase();
                    idValue = cleanCountryCode + "~" + cleanCountry.split('~')[1];
                }
                idValue = idValue.replace(/\s+/g, '-');
                document.getElementById(idValue).checked = false;
                $scope.applyFilters();
            }
        }
    };

    // show or hide long selection lists on click event
    $scope.loadMore = function(listName) {
        // Filter selectors to show in increasing groups until the limit is reached then remove the more link
        // TODO make this more Generic and reusable
        var selectorListLength = $scope.selectCityLength;
        if (listName == "selectCity") {
            if ($scope.moreCity) {
                // set to show all
                $scope.limitCity = $scope.selectCityLength;
                $scope.moreCity = false; //change More Link
            } else {
                $scope.limitCity = ENV.limitCity;
                $scope.moreCity = true; //change More Link
            }
        } else if (listName == "selectDepartment") {
            if ($scope.moreDepartment) {
                // set to show all
                $scope.limitDepartment = $scope.selectDepartmentLength;
                $scope.moreDepartment = false; //change More Link
            } else {
                $scope.limitDepartment = ENV.limitDepartment;
                $scope.moreDepartment = true; //change More Link
            }
        }
    };

    // Call Scope Init
    $scope.init();
});