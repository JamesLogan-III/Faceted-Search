'use strict';
angular.module('JobsApp')
    .service('job', function map($http, $q, $rootScope, ENV) {
        // Get complete list of Jobs from SmartRecuiters API endpoint
        var job = this;
        job.offsetRequests = [];
        job.jobList = [];

        job.getJobsData = function(fetchCount) {
            // Fetch job postings from SmartRecuiters, the count will be computed to provide a looping mechanism, SmartRecuiters limits API results to 100 per request
            var offset = Math.ceil(fetchCount / 100);
            for (var i = 0; i < offset; i++) {
                // Set up an array to loop through offset requests to compile all the posted jobs
                job.offsetRequests.push($http.get('https://api.smartrecruiters.com/v1/companies/' + ENV.company.code + '/postings?&offset=' + i + '00'));
            }
            return $q.all(job.offsetRequests).then(function(result) {
                    var tmp = [];
                    angular.forEach(result, function(response) {
                        angular.forEach(response.data.content, function(response) {
                            // Push only the Content Element into the tmp variable, ignoring the count, offset and limit values
                            tmp.push(response);
                        });
                    });
                    return tmp;
                })
                .then(function(result) {
                    // Set the jobList.content based on the assembled requests 
                    job.jobList.content = result;
                });
        }

        job.getJobsMeta = function() {
            // Fetch a sample posting from SmartRecuiters, This will contain the job count for later requests
            var defer = $q.defer();
            $http.get('https://api.smartrecruiters.com/v1/companies/' + ENV.company.code + '/postings?&limit=1')
                .success(function(jobData) {
                    job.jobCount = jobData.totalFound;
                    defer.resolve(jobData.totalFound);
                })
                .error(function(err, status) {
                    defer.reject(err);
                })
            return defer.promise;
        }
        return job;
    });