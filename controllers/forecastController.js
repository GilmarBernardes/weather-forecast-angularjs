weatherApp.controller('forecastController', [
    '$scope',
    '$routeParams',
    'CityService',
    'WeatherService',
    'WeatherMockService',
function(
    $scope, 
    $routeParams, 
    CityService,
    WeatherService,
    /** WeatherMockService **/) {

$scope.city = CityService.city;

$scope.paramDays = $routeParams.days;

// limited by the maximum range allowed by api '5 Day weather forecast'
$scope.days = ($scope.paramDays > 0 && $scope.paramDays <= 5) ? $scope.paramDays : '1';

// Calling a static data
// $scope.weatherResult = WeatherMockService.GetWeatherMock();
    
// Calling the openweathermap API
$scope.weatherResult = {};
WeatherService.GetWeather($scope.city, $scope.days)
.then(function(data) {
    $scope.weatherResult = data;
    
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
    if ($scope.weatherResult && $scope.weatherResult.list) {
        $scope.getForecastByDay = function(cntDay) {
            for (var i = 5; i < (cntDay * 8); i += 8) {
                $scope.weatherResultList.push($scope.weatherResult.list[i]);
            }
        };

        $scope.getForecastByDay($scope.days);    
    }
    
    
})
.catch(function(error) {
    console.error('Erro ao obter dados meteorológicos:', error);
});
}]);