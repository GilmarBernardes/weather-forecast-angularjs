weatherApp.service('CityService', function() {
    this.city = "Goiania" ;
 });
 
 weatherApp.service('WeatherService', ['$http', '$q', function($http, $q) {
     var apiKey = '975fd8f3142aa0a193c8b0b0b4705d97';
 
     this.GetWeather = function(city, days) {
         var deferred = $q.defer();
         
         //($scope.days * 8) because I'm using the api for 5 days with data every 3 hours (it´s free)
         var calculatedDays = days * 8;
         var url = 'https://api.openweathermap.org/data/2.5/forecast';
         
         var params = {
             q: city,
             cnt: calculatedDays,
             appid: apiKey
         };
 
         $http.get(url, { params: params })
         .then(function(response) {
             deferred.resolve(response.data);
         }).catch(function(error) {
             deferred.reject(error);
         });
         
         return deferred.promise;
     };
     
 }]);
 
 weatherApp.service('WeatherMockService', ['forecastMockService', function(forecastMockService) {
     this.GetWeatherMock = function()  {
         return forecastMockService.mock;
     };
 }]);