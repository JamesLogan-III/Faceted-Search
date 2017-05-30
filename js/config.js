'use strict';

angular.module('JobsApp').constant('ENV', {       
    'jobShowLimit': 10, // number of jobs to show
    'undefinedJobFunctionLabel': 'Uncategorized', // label to replace undefined in Job Function and Job Type results
    'undefinedJobTypeLabel': 'Uncategorized Job Type', // label to replace undefined in Job Function and Job Type results
    'limitCity': 5, // number of location filters to show before the more link is shown
    'limitDepartment': 5, // number of department filters to show before the more link is shown
    
/*

    'company' : {
        'name': 'Atlassian', //Presentation Name of Company
        'code' : 'Atlassian', // Name of Smart Recruiters company account, used in URLs
        'URL' : 'https://www.atlassian.com/', // Company URL
        'imageURL' : 'https://c.smartrecruiters.com/sr-company-logo-prod/54ed938de4b0c06244a3083e/huge?r=s3&_1493821290288' //Logo image URL
    }

    'company' : {
        'name': 'AccuV', //Presentation Name of Company
        'code' : 'Nexius', // Name of Smart Recruiters company account, used in URLs
        'URL' : 'http://nexius.com/', // Company URL
        'imageURL' : 'https://c.smartrecruiters.com/sr-company-images-prod/55707a87e4b09f5cbde8af71/49419227-cbf3-43d3-bdd8-fe67593bb957/huge?r=s3&_1455746317725' //Logo image URL
    }

    'company' : {
        'name': 'NationalSigningSource1', //Presentation Name of Company
        'code' : 'NationalSigningSource1', // Name of Smart Recruiters company account, used in URLs
        'URL' : 'https://nationalnotaryofamerica.com/', // Company URL
        'imageURL' : 'https://c.smartrecruiters.com/sr-company-logo-prod/55f65cffe4b0ac39139d9ae8/huge?r=s3&_1487680065965' //Logo image URL
    }

    'company' : {
        'name': 'Skechers', //Presentation Name of Company
        'code' : 'Skechers1', // Name of Smart Recruiters company account, used in URLs
        'URL' : 'https://www.skechers.com/en-us/', // Company URL
        'imageURL' : 'https://c.smartrecruiters.com/sr-company-logo-prod/54c280dde4b0ea04bddbaecc/huge?r=s3&_1445390873999' //Logo image URL
    }

    'company' : {
        'name': 'Easter Seals of Southern California', //Presentation Name of Company
        'code' : 'EastersealsSouthernCalifornia', // Name of Smart Recruiters company account, used in URLs
        'URL' : 'http://www.easterseals.com/southerncal/', // Company URL
        'imageURL' : 'https://c.smartrecruiters.com/sr-company-logo-prod/52322878e4b058b288cd8a86/huge?r=s3&_1472676003254' //Logo image URL
    }

    'company' : {
        'name': 'Code LLC', //Presentation Name of Company
        'code' : 'CodeLLC', // Name of Smart Recruiters company account, used in URLs
        'URL' : 'http://www.code-talent.com/', // Company URL
        'imageURL' : 'https://c.smartrecruiters.com/sr-company-logo-prod/5135d6f9e4b0b42dcb45ec28/huge?r=s3&_1441130104596' //Logo image URL
    }
      
    'company' : {
        'name': 'Artech Information Systems LLC', //Presentation Name of Company
        'code' : 'ArtechInformationSystemLLC', // Name of Smart Recruiters company account, used in URLs
        'URL' : 'http://www.artechinfo.com/', // Company URL
        'imageURL' : 'https://c.smartrecruiters.com/sr-company-logo-prod/5392351fe4b0196a1aecc0d8/huge?r=s3&_1495479735793' //Logo image URL
    }
    
    'company' : {
        'name': 'Continental Technology Solutions', //Presentation Name of Company
        'code' : 'ContinentalTechnologySolutions', // Name of Smart Recruiters company account, used in URLs
        'URL' : 'http://ctsincorp.com/', // Company URL
        'imageURL' : 'https://c.smartrecruiters.com/sr-company-logo-prod/57cf00d5e4b00e6ab7546463/huge?r=s3&_1480519525541' //Logo image URL
    }

    'company' : {
        'name': 'Ubisoft', //Presentation Name of Company
        'code' : 'Ubisoft2', // Name of Smart Recruiters company account, used in URLs
        'URL' : 'https://www.ubisoft.com/en-US/', // Company URL
        'imageURL' : 'https://c.smartrecruiters.com/sr-company-logo-prod/56be0df1e4b043c434798ee2/huge?r=s3&_1456581056743' //Logo image URL
    }
*/
    'company' : {
        'name': 'Visa', //Presentation Name of Company
        'code' : 'visa', // Name of Smart Recruiters company account, used in URLs
        'URL' : 'https://usa.visa.com/', // Company URL
        'imageURL' : 'https://c.smartrecruiters.com/sr-company-logo-prod/57a11f9de4b09d766b5b5dd6/huge?r=s3&_1470674540809' //Logo image URL
    }
/*
    'company' : {
        'name': 'Bosch Group', //Presentation Name of Company
        'code' : 'BoschGroup', // Name of Smart Recruiters company account, used in URLs
        'URL' : 'https://www.bosch.com/', // Company URL
        'imageURL' : 'https://c.smartrecruiters.com/sr-company-logo-prod/58652035e4b04016904de9fe/huge?r=s3&_1483383188868' //Logo image URL
    }

    'company' : {
        'name': 'Microstrategy', //Presentation Name of Company
        'code' : 'microstrategy1', // Name of Smart Recruiters company account, used in URLs
        'URL' : 'https://www.microstrategy.com/us/', // Company URL
        'imageURL' : 'https://c.smartrecruiters.com/sr-company-logo-prod/55de0224e4b01d0afd2d8f96/huge?r=s3&_1477436674702' //Logo image URL
    }

    'company' : {
        'name': 'Dollar Financial Group', //Presentation Name of Company
        'code' : 'dollarfinancialgroup', // Name of Smart Recruiters company account, used in URLs
        'URL' : 'http://www.dfcglobalcorp.com/index.html', // Company URL
        'imageURL' : 'https://c.smartrecruiters.com/sr-company-logo-prod/5135d718e4b0b42dcb45fa85/huge?r=s3&_1408021049706' //Logo image URL
    }

    'company' : {
        'name': 'Aol', //Presentation Name of Company
        'code' : 'Aol', // Name of Smart Recruiters company account, used in URLs
        'URL' : 'https://www.aol.com/', // Company URL
        'imageURL' : 'https://c.smartrecruiters.com/sr-company-images-prod/5448213ee4b06f506a4f39c3/ecfe92c1-e768-4387-bc46-db1cae796e08/huge?r=s3&_1463614354862' //Logo image URL
    }
    


*/


});