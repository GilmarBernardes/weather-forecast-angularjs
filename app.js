var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// Routes
weatherApp.config(function ($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
    
    .when('/forecast/0', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
    
    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    });
    
});

// Services
weatherApp.service('cityService', function() {
   this.city = "Goiania" ;
});

// Controllers
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
       cityService.city = $scope.city; 
    });
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', 'forecastMock', function($scope, $resource, $routeParams, cityService, forecastMock) {
    $scope.city = cityService.city;
    
    $scope.paramDays = $routeParams.days;
    
    // limited by the maximum range allowed by api '5 Day weather forecast'
    $scope.days = ($scope.paramDays > 0 && $scope.paramDays <= 5) ?$scope.paramDays : 5;
    
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



// Mocking request response
weatherApp.service('forecastMock', function() {
    this.mock = ({
        "city": {
            "coord": {
                "lat": -16.6786,
                "lon": -49.2539
            },
            "country": "BR",
            "id": 3462377,
            "name": "Goiânia",
            "population": 1171195,
            "sunrise": 1699864527,
            "sunset": 1699910834,
            "timezone": -10800
        },
        "cnt": 40,
        "cod": "200",
        "list": [
            {
                "clouds": {
                    "all": 0
                },
                "dt": 1699920000,
                "dt_txt": "2023-11-14 00:00:00",
                "main": {
                    "feels_like": 299.21,
                    "grnd_level": 927,
                    "humidity": 61,
                    "pressure": 1014,
                    "sea_level": 1014,
                    "temp": 298.98,
                    "temp_kf": -1.55,
                    "temp_max": 300.53,
                    "temp_min": 298.98
                },
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "clear sky",
                        "icon": "01n",
                        "id": 800,
                        "main": "Clear"
                    }
                ],
                "wind": {
                    "deg": 281,
                    "gust": 3.95,
                    "speed": 1.44
                }
            },
            {
                "clouds": {
                    "all": 2
                },
                "dt": 1699930800,
                "dt_txt": "2023-11-14 03:00:00",
                "main": {
                    "feels_like": 298.72,
                    "grnd_level": 926,
                    "humidity": 53,
                    "pressure": 1013,
                    "sea_level": 1013,
                    "temp": 298.72,
                    "temp_kf": 0.52,
                    "temp_max": 298.72,
                    "temp_min": 298.2
                },
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "clear sky",
                        "icon": "01n",
                        "id": 800,
                        "main": "Clear"
                    }
                ],
                "wind": {
                    "deg": 90,
                    "gust": 0.84,
                    "speed": 0.83
                }
            },
            {
                "clouds": {
                    "all": 3
                },
                "dt": 1699941600,
                "dt_txt": "2023-11-14 06:00:00",
                "main": {
                    "feels_like": 297.46,
                    "grnd_level": 925,
                    "humidity": 47,
                    "pressure": 1011,
                    "sea_level": 1011,
                    "temp": 297.72,
                    "temp_kf": 0.63,
                    "temp_max": 297.72,
                    "temp_min": 297.09
                },
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "clear sky",
                        "icon": "01n",
                        "id": 800,
                        "main": "Clear"
                    }
                ],
                "wind": {
                    "deg": 10,
                    "gust": 1.15,
                    "speed": 1.08
                }
            },
            {
                "clouds": {
                    "all": 0
                },
                "dt": 1699952400,
                "dt_txt": "2023-11-14 09:00:00",
                "main": {
                    "feels_like": 295.94,
                    "grnd_level": 926,
                    "humidity": 42,
                    "pressure": 1011,
                    "sea_level": 1011,
                    "temp": 296.46,
                    "temp_kf": 0,
                    "temp_max": 296.46,
                    "temp_min": 296.46
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "clear sky",
                        "icon": "01d",
                        "id": 800,
                        "main": "Clear"
                    }
                ],
                "wind": {
                    "deg": 51,
                    "gust": 1.55,
                    "speed": 1.39
                }
            },
            {
                "clouds": {
                    "all": 0
                },
                "dt": 1699963200,
                "dt_txt": "2023-11-14 12:00:00",
                "main": {
                    "feels_like": 305.24,
                    "grnd_level": 928,
                    "humidity": 20,
                    "pressure": 1010,
                    "sea_level": 1010,
                    "temp": 307.27,
                    "temp_kf": 0,
                    "temp_max": 307.27,
                    "temp_min": 307.27
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "clear sky",
                        "icon": "01d",
                        "id": 800,
                        "main": "Clear"
                    }
                ],
                "wind": {
                    "deg": 9,
                    "gust": 2.82,
                    "speed": 2.15
                }
            },
            {
                "clouds": {
                    "all": 0
                },
                "dt": 1699974000,
                "dt_txt": "2023-11-14 15:00:00",
                "main": {
                    "feels_like": 309.34,
                    "grnd_level": 927,
                    "humidity": 13,
                    "pressure": 1008,
                    "sea_level": 1008,
                    "temp": 311.88,
                    "temp_kf": 0,
                    "temp_max": 311.88,
                    "temp_min": 311.88
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "clear sky",
                        "icon": "01d",
                        "id": 800,
                        "main": "Clear"
                    }
                ],
                "wind": {
                    "deg": 6,
                    "gust": 4.5,
                    "speed": 3.16
                }
            },
            {
                "clouds": {
                    "all": 2
                },
                "dt": 1699984800,
                "dt_txt": "2023-11-14 18:00:00",
                "main": {
                    "feels_like": 310.3,
                    "grnd_level": 924,
                    "humidity": 11,
                    "pressure": 1004,
                    "sea_level": 1004,
                    "temp": 313.13,
                    "temp_kf": 0,
                    "temp_max": 313.13,
                    "temp_min": 313.13
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "clear sky",
                        "icon": "01d",
                        "id": 800,
                        "main": "Clear"
                    }
                ],
                "wind": {
                    "deg": 347,
                    "gust": 5.99,
                    "speed": 3.15
                }
            },
            {
                "clouds": {
                    "all": 47
                },
                "dt": 1699995600,
                "dt_txt": "2023-11-14 21:00:00",
                "main": {
                    "feels_like": 304.3,
                    "grnd_level": 924,
                    "humidity": 20,
                    "pressure": 1005,
                    "sea_level": 1005,
                    "temp": 306.36,
                    "temp_kf": 0,
                    "temp_max": 306.36,
                    "temp_min": 306.36
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "scattered clouds",
                        "icon": "03d",
                        "id": 802,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 184,
                    "gust": 3.66,
                    "speed": 0.95
                }
            },
            {
                "clouds": {
                    "all": 48
                },
                "dt": 1700006400,
                "dt_txt": "2023-11-15 00:00:00",
                "main": {
                    "feels_like": 299.77,
                    "grnd_level": 926,
                    "humidity": 32,
                    "pressure": 1009,
                    "sea_level": 1009,
                    "temp": 300.33,
                    "temp_kf": 0,
                    "temp_max": 300.33,
                    "temp_min": 300.33
                },
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "scattered clouds",
                        "icon": "03n",
                        "id": 802,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 36,
                    "gust": 1.2,
                    "speed": 0.99
                }
            },
            {
                "clouds": {
                    "all": 94
                },
                "dt": 1700017200,
                "dt_txt": "2023-11-15 03:00:00",
                "main": {
                    "feels_like": 299.38,
                    "grnd_level": 925,
                    "humidity": 32,
                    "pressure": 1009,
                    "sea_level": 1009,
                    "temp": 299.38,
                    "temp_kf": 0,
                    "temp_max": 299.38,
                    "temp_min": 299.38
                },
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "overcast clouds",
                        "icon": "04n",
                        "id": 804,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 247,
                    "gust": 1,
                    "speed": 0.79
                }
            },
            {
                "clouds": {
                    "all": 58
                },
                "dt": 1700028000,
                "dt_txt": "2023-11-15 06:00:00",
                "main": {
                    "feels_like": 296.83,
                    "grnd_level": 924,
                    "humidity": 35,
                    "pressure": 1008,
                    "sea_level": 1008,
                    "temp": 297.43,
                    "temp_kf": 0,
                    "temp_max": 297.43,
                    "temp_min": 297.43
                },
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "broken clouds",
                        "icon": "04n",
                        "id": 803,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 349,
                    "gust": 0.81,
                    "speed": 0.77
                }
            },
            {
                "clouds": {
                    "all": 33
                },
                "dt": 1700038800,
                "dt_txt": "2023-11-15 09:00:00",
                "main": {
                    "feels_like": 296.66,
                    "grnd_level": 925,
                    "humidity": 36,
                    "pressure": 1010,
                    "sea_level": 1010,
                    "temp": 297.25,
                    "temp_kf": 0,
                    "temp_max": 297.25,
                    "temp_min": 297.25
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "scattered clouds",
                        "icon": "03d",
                        "id": 802,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 80,
                    "gust": 0.74,
                    "speed": 0.78
                }
            },
            {
                "clouds": {
                    "all": 32
                },
                "dt": 1700049600,
                "dt_txt": "2023-11-15 12:00:00",
                "main": {
                    "feels_like": 306.09,
                    "grnd_level": 928,
                    "humidity": 19,
                    "pressure": 1010,
                    "sea_level": 1010,
                    "temp": 308.16,
                    "temp_kf": 0,
                    "temp_max": 308.16,
                    "temp_min": 308.16
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "scattered clouds",
                        "icon": "03d",
                        "id": 802,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 106,
                    "gust": 0.85,
                    "speed": 0.95
                }
            },
            {
                "clouds": {
                    "all": 27
                },
                "dt": 1700060400,
                "dt_txt": "2023-11-15 15:00:00",
                "main": {
                    "feels_like": 311.25,
                    "grnd_level": 927,
                    "humidity": 13,
                    "pressure": 1007,
                    "sea_level": 1007,
                    "temp": 313.63,
                    "temp_kf": 0,
                    "temp_max": 313.63,
                    "temp_min": 313.63
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "scattered clouds",
                        "icon": "03d",
                        "id": 802,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 119,
                    "gust": 3.66,
                    "speed": 1.39
                }
            },
            {
                "clouds": {
                    "all": 44
                },
                "dt": 1700071200,
                "dt_txt": "2023-11-15 18:00:00",
                "main": {
                    "feels_like": 309.7,
                    "grnd_level": 923,
                    "humidity": 15,
                    "pressure": 1003,
                    "sea_level": 1003,
                    "temp": 311.89,
                    "temp_kf": 0,
                    "temp_max": 311.89,
                    "temp_min": 311.89
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "scattered clouds",
                        "icon": "03d",
                        "id": 802,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 28,
                    "gust": 4.78,
                    "speed": 1.94
                }
            },
            {
                "clouds": {
                    "all": 96
                },
                "dt": 1700082000,
                "dt_txt": "2023-11-15 21:00:00",
                "main": {
                    "feels_like": 304.19,
                    "grnd_level": 923,
                    "humidity": 21,
                    "pressure": 1005,
                    "sea_level": 1005,
                    "temp": 306.18,
                    "temp_kf": 0,
                    "temp_max": 306.18,
                    "temp_min": 306.18
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "overcast clouds",
                        "icon": "04d",
                        "id": 804,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 272,
                    "gust": 7.23,
                    "speed": 3.91
                }
            },
            {
                "clouds": {
                    "all": 96
                },
                "dt": 1700092800,
                "dt_txt": "2023-11-16 00:00:00",
                "main": {
                    "feels_like": 301.9,
                    "grnd_level": 924,
                    "humidity": 26,
                    "pressure": 1007,
                    "sea_level": 1007,
                    "temp": 303.44,
                    "temp_kf": 0,
                    "temp_max": 303.44,
                    "temp_min": 303.44
                },
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "overcast clouds",
                        "icon": "04n",
                        "id": 804,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 31,
                    "gust": 3.54,
                    "speed": 1.34
                }
            },
            {
                "clouds": {
                    "all": 89
                },
                "dt": 1700103600,
                "dt_txt": "2023-11-16 03:00:00",
                "main": {
                    "feels_like": 299.56,
                    "grnd_level": 924,
                    "humidity": 33,
                    "pressure": 1008,
                    "sea_level": 1008,
                    "temp": 299.94,
                    "temp_kf": 0,
                    "temp_max": 299.94,
                    "temp_min": 299.94
                },
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "overcast clouds",
                        "icon": "04n",
                        "id": 804,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 74,
                    "gust": 3.04,
                    "speed": 1.71
                }
            },
            {
                "clouds": {
                    "all": 89
                },
                "dt": 1700114400,
                "dt_txt": "2023-11-16 06:00:00",
                "main": {
                    "feels_like": 298.02,
                    "grnd_level": 923,
                    "humidity": 41,
                    "pressure": 1007,
                    "sea_level": 1007,
                    "temp": 298.37,
                    "temp_kf": 0,
                    "temp_max": 298.37,
                    "temp_min": 298.37
                },
                "pop": 0.2,
                "rain": {
                    "3h": 0.19
                },
                "sys": {
                    "pod": "n"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "light rain",
                        "icon": "10n",
                        "id": 500,
                        "main": "Rain"
                    }
                ],
                "wind": {
                    "deg": 112,
                    "gust": 5.74,
                    "speed": 3.06
                }
            },
            {
                "clouds": {
                    "all": 59
                },
                "dt": 1700125200,
                "dt_txt": "2023-11-16 09:00:00",
                "main": {
                    "feels_like": 297.86,
                    "grnd_level": 924,
                    "humidity": 39,
                    "pressure": 1008,
                    "sea_level": 1008,
                    "temp": 298.27,
                    "temp_kf": 0,
                    "temp_max": 298.27,
                    "temp_min": 298.27
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "broken clouds",
                        "icon": "04d",
                        "id": 803,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 77,
                    "gust": 2.44,
                    "speed": 1.72
                }
            },
            {
                "clouds": {
                    "all": 36
                },
                "dt": 1700136000,
                "dt_txt": "2023-11-16 12:00:00",
                "main": {
                    "feels_like": 306.91,
                    "grnd_level": 926,
                    "humidity": 19,
                    "pressure": 1007,
                    "sea_level": 1007,
                    "temp": 308.9,
                    "temp_kf": 0,
                    "temp_max": 308.9,
                    "temp_min": 308.9
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "scattered clouds",
                        "icon": "03d",
                        "id": 802,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 53,
                    "gust": 5.09,
                    "speed": 4.28
                }
            },
            {
                "clouds": {
                    "all": 1
                },
                "dt": 1700146800,
                "dt_txt": "2023-11-16 15:00:00",
                "main": {
                    "feels_like": 311.54,
                    "grnd_level": 924,
                    "humidity": 13,
                    "pressure": 1004,
                    "sea_level": 1004,
                    "temp": 313.89,
                    "temp_kf": 0,
                    "temp_max": 313.89,
                    "temp_min": 313.89
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "clear sky",
                        "icon": "01d",
                        "id": 800,
                        "main": "Clear"
                    }
                ],
                "wind": {
                    "deg": 344,
                    "gust": 3.36,
                    "speed": 3.05
                }
            },
            {
                "clouds": {
                    "all": 47
                },
                "dt": 1700157600,
                "dt_txt": "2023-11-16 18:00:00",
                "main": {
                    "feels_like": 311.4,
                    "grnd_level": 922,
                    "humidity": 13,
                    "pressure": 1001,
                    "sea_level": 1001,
                    "temp": 313.77,
                    "temp_kf": 0,
                    "temp_max": 313.77,
                    "temp_min": 313.77
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "scattered clouds",
                        "icon": "03d",
                        "id": 802,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 6,
                    "gust": 4.4,
                    "speed": 3.65
                }
            },
            {
                "clouds": {
                    "all": 100
                },
                "dt": 1700168400,
                "dt_txt": "2023-11-16 21:00:00",
                "main": {
                    "feels_like": 305.05,
                    "grnd_level": 922,
                    "humidity": 22,
                    "pressure": 1004,
                    "sea_level": 1004,
                    "temp": 306.91,
                    "temp_kf": 0,
                    "temp_max": 306.91,
                    "temp_min": 306.91
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "overcast clouds",
                        "icon": "04d",
                        "id": 804,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 342,
                    "gust": 3.59,
                    "speed": 2.13
                }
            },
            {
                "clouds": {
                    "all": 100
                },
                "dt": 1700179200,
                "dt_txt": "2023-11-17 00:00:00",
                "main": {
                    "feels_like": 302.08,
                    "grnd_level": 924,
                    "humidity": 29,
                    "pressure": 1006,
                    "sea_level": 1006,
                    "temp": 303.42,
                    "temp_kf": 0,
                    "temp_max": 303.42,
                    "temp_min": 303.42
                },
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "overcast clouds",
                        "icon": "04n",
                        "id": 804,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 80,
                    "gust": 1.99,
                    "speed": 1.5
                }
            },
            {
                "clouds": {
                    "all": 98
                },
                "dt": 1700190000,
                "dt_txt": "2023-11-17 03:00:00",
                "main": {
                    "feels_like": 301.09,
                    "grnd_level": 924,
                    "humidity": 33,
                    "pressure": 1007,
                    "sea_level": 1007,
                    "temp": 302.01,
                    "temp_kf": 0,
                    "temp_max": 302.01,
                    "temp_min": 302.01
                },
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "overcast clouds",
                        "icon": "04n",
                        "id": 804,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 30,
                    "gust": 5.6,
                    "speed": 2.79
                }
            },
            {
                "clouds": {
                    "all": 98
                },
                "dt": 1700200800,
                "dt_txt": "2023-11-17 06:00:00",
                "main": {
                    "feels_like": 300.9,
                    "grnd_level": 922,
                    "humidity": 33,
                    "pressure": 1005,
                    "sea_level": 1005,
                    "temp": 301.79,
                    "temp_kf": 0,
                    "temp_max": 301.79,
                    "temp_min": 301.79
                },
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "overcast clouds",
                        "icon": "04n",
                        "id": 804,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 7,
                    "gust": 11.8,
                    "speed": 4.18
                }
            },
            {
                "clouds": {
                    "all": 47
                },
                "dt": 1700211600,
                "dt_txt": "2023-11-17 09:00:00",
                "main": {
                    "feels_like": 299.77,
                    "grnd_level": 923,
                    "humidity": 37,
                    "pressure": 1007,
                    "sea_level": 1007,
                    "temp": 300,
                    "temp_kf": 0,
                    "temp_max": 300,
                    "temp_min": 300
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "scattered clouds",
                        "icon": "03d",
                        "id": 802,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 1,
                    "gust": 1.8,
                    "speed": 1.18
                }
            },
            {
                "clouds": {
                    "all": 29
                },
                "dt": 1700222400,
                "dt_txt": "2023-11-17 12:00:00",
                "main": {
                    "feels_like": 307.58,
                    "grnd_level": 926,
                    "humidity": 23,
                    "pressure": 1007,
                    "sea_level": 1007,
                    "temp": 308.96,
                    "temp_kf": 0,
                    "temp_max": 308.96,
                    "temp_min": 308.96
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "scattered clouds",
                        "icon": "03d",
                        "id": 802,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 341,
                    "gust": 7.55,
                    "speed": 5.49
                }
            },
            {
                "clouds": {
                    "all": 23
                },
                "dt": 1700233200,
                "dt_txt": "2023-11-17 15:00:00",
                "main": {
                    "feels_like": 310.74,
                    "grnd_level": 925,
                    "humidity": 19,
                    "pressure": 1005,
                    "sea_level": 1005,
                    "temp": 312.04,
                    "temp_kf": 0,
                    "temp_max": 312.04,
                    "temp_min": 312.04
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "few clouds",
                        "icon": "02d",
                        "id": 801,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 1,
                    "gust": 4.46,
                    "speed": 6.48
                }
            },
            {
                "clouds": {
                    "all": 42
                },
                "dt": 1700244000,
                "dt_txt": "2023-11-17 18:00:00",
                "main": {
                    "feels_like": 308.4,
                    "grnd_level": 922,
                    "humidity": 20,
                    "pressure": 1002,
                    "sea_level": 1002,
                    "temp": 310.03,
                    "temp_kf": 0,
                    "temp_max": 310.03,
                    "temp_min": 310.03
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "scattered clouds",
                        "icon": "03d",
                        "id": 802,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 326,
                    "gust": 4.05,
                    "speed": 3.63
                }
            },
            {
                "clouds": {
                    "all": 21
                },
                "dt": 1700254800,
                "dt_txt": "2023-11-17 21:00:00",
                "main": {
                    "feels_like": 307.06,
                    "grnd_level": 921,
                    "humidity": 21,
                    "pressure": 1002,
                    "sea_level": 1002,
                    "temp": 308.79,
                    "temp_kf": 0,
                    "temp_max": 308.79,
                    "temp_min": 308.79
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "few clouds",
                        "icon": "02d",
                        "id": 801,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 344,
                    "gust": 3.69,
                    "speed": 2.2
                }
            },
            {
                "clouds": {
                    "all": 23
                },
                "dt": 1700265600,
                "dt_txt": "2023-11-18 00:00:00",
                "main": {
                    "feels_like": 301.98,
                    "grnd_level": 923,
                    "humidity": 32,
                    "pressure": 1005,
                    "sea_level": 1005,
                    "temp": 303.07,
                    "temp_kf": 0,
                    "temp_max": 303.07,
                    "temp_min": 303.07
                },
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "few clouds",
                        "icon": "02n",
                        "id": 801,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 12,
                    "gust": 10.16,
                    "speed": 3.47
                }
            },
            {
                "clouds": {
                    "all": 2
                },
                "dt": 1700276400,
                "dt_txt": "2023-11-18 03:00:00",
                "main": {
                    "feels_like": 300.92,
                    "grnd_level": 922,
                    "humidity": 38,
                    "pressure": 1005,
                    "sea_level": 1005,
                    "temp": 301.43,
                    "temp_kf": 0,
                    "temp_max": 301.43,
                    "temp_min": 301.43
                },
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "clear sky",
                        "icon": "01n",
                        "id": 800,
                        "main": "Clear"
                    }
                ],
                "wind": {
                    "deg": 338,
                    "gust": 11.86,
                    "speed": 3.97
                }
            },
            {
                "clouds": {
                    "all": 19
                },
                "dt": 1700287200,
                "dt_txt": "2023-11-18 06:00:00",
                "main": {
                    "feels_like": 298.35,
                    "grnd_level": 922,
                    "humidity": 51,
                    "pressure": 1006,
                    "sea_level": 1006,
                    "temp": 298.43,
                    "temp_kf": 0,
                    "temp_max": 298.43,
                    "temp_min": 298.43
                },
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "few clouds",
                        "icon": "02n",
                        "id": 801,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 339,
                    "gust": 11.75,
                    "speed": 3.58
                }
            },
            {
                "clouds": {
                    "all": 24
                },
                "dt": 1700298000,
                "dt_txt": "2023-11-18 09:00:00",
                "main": {
                    "feels_like": 297.75,
                    "grnd_level": 923,
                    "humidity": 58,
                    "pressure": 1008,
                    "sea_level": 1008,
                    "temp": 297.72,
                    "temp_kf": 0,
                    "temp_max": 297.72,
                    "temp_min": 297.72
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "few clouds",
                        "icon": "02d",
                        "id": 801,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 338,
                    "gust": 13.47,
                    "speed": 4.43
                }
            },
            {
                "clouds": {
                    "all": 22
                },
                "dt": 1700308800,
                "dt_txt": "2023-11-18 12:00:00",
                "main": {
                    "feels_like": 305.14,
                    "grnd_level": 926,
                    "humidity": 36,
                    "pressure": 1008,
                    "sea_level": 1008,
                    "temp": 305.43,
                    "temp_kf": 0,
                    "temp_max": 305.43,
                    "temp_min": 305.43
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "few clouds",
                        "icon": "02d",
                        "id": 801,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 325,
                    "gust": 9.21,
                    "speed": 6.23
                }
            },
            {
                "clouds": {
                    "all": 5
                },
                "dt": 1700319600,
                "dt_txt": "2023-11-18 15:00:00",
                "main": {
                    "feels_like": 310.97,
                    "grnd_level": 924,
                    "humidity": 21,
                    "pressure": 1005,
                    "sea_level": 1005,
                    "temp": 311.84,
                    "temp_kf": 0,
                    "temp_max": 311.84,
                    "temp_min": 311.84
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "clear sky",
                        "icon": "01d",
                        "id": 800,
                        "main": "Clear"
                    }
                ],
                "wind": {
                    "deg": 329,
                    "gust": 6.09,
                    "speed": 5.52
                }
            },
            {
                "clouds": {
                    "all": 34
                },
                "dt": 1700330400,
                "dt_txt": "2023-11-18 18:00:00",
                "main": {
                    "feels_like": 309.91,
                    "grnd_level": 921,
                    "humidity": 19,
                    "pressure": 1001,
                    "sea_level": 1001,
                    "temp": 311.4,
                    "temp_kf": 0,
                    "temp_max": 311.4,
                    "temp_min": 311.4
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "scattered clouds",
                        "icon": "03d",
                        "id": 802,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 338,
                    "gust": 4.61,
                    "speed": 4.02
                }
            },
            {
                "clouds": {
                    "all": 60
                },
                "dt": 1700341200,
                "dt_txt": "2023-11-18 21:00:00",
                "main": {
                    "feels_like": 306.58,
                    "grnd_level": 921,
                    "humidity": 26,
                    "pressure": 1002,
                    "sea_level": 1002,
                    "temp": 307.77,
                    "temp_kf": 0,
                    "temp_max": 307.77,
                    "temp_min": 307.77
                },
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "visibility": 10000,
                "weather": [
                    {
                        "description": "broken clouds",
                        "icon": "04d",
                        "id": 803,
                        "main": "Clouds"
                    }
                ],
                "wind": {
                    "deg": 307,
                    "gust": 7.81,
                    "speed": 4.46
                }
            }
        ],
        "message": 0
        
    });
});