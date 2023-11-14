weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', 'forecastMock', function($scope, $resource, $routeParams, cityService, forecastMock) {
    $scope.city = cityService.city;
    
    $scope.paramDays = $routeParams.days;
    
    // limited by the maximum range allowed by api '5 Day weather forecast'
    $scope.days = ($scope.paramDays > 0 && $scope.paramDays <= 5) ?$scope.paramDays : '1';
    
    /*
    let token = '975fd8f3142aa0a193c8b0b0b4705d97';
    let url = 'https://api.openweathermap.org/data/2.5/forecast';
    
    $scope.weatherAPI = $resource(url, {
       callback: "JSON_CALLBACK" 
    },
    {
        get: {method: "JSONP" }
    });
    
    //($scope.days * 8) because I'm using the api for 5 days with data every 3 hours (it´s free)
    $scope.weatherResult = $scope.weatherAPI.get({
        q: $scope.city,
        cnt: ($scope.days * 8),
        appid: token
    });
    */
    
    $scope.weatherResult = forecastMock.mock;
    
    $scope.convertToCelsius = function(tempInKelvin) {
        let fullTemperature = tempInKelvin - 273.15;
        return Math.round((fullTemperature + Number.EPSILON) * 100) / 100 ;
    };
    
    $scope.convertDate = function(dt) {
        return new Date(dt * 1000);
    };
    
    $scope.weatherResultList = [];

    // starting in 5 to get the midday of the day.
    // iterating over each 8 objects because each day have 8 intervals of 3 hours
    
    $scope.getForecastByDay = function(cntDay) {
        for (var i = 5; i < (cntDay * 8); i += 8) {
            $scope.weatherResultList.push($scope.weatherResult.list[i]);
        }
    };
    
    $scope.getForecastByDay($scope.days);
    
}]);