logRegModule.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',

    function($stateProvider, $urlRouterProvider, $locationProvider) {

        // $locationProvider.html5Mode({ enabled: false, requireBase: true }).hashPrefix('!');

        $stateProvider.state('login', {
            url: '/login',
            templateUrl: '/angular/views/login.html',
            // resolve: {
            //     loggedin: checkLoggedIn
            // }
        });


        $stateProvider.state('register', {
            url: '/register',
            templateUrl: '/angular/views/register.html',
            // resolve: {
            //     loggedin: checkLoggedIn
            // }
        });


        //
        $urlRouterProvider.otherwise('/login');
    }
]);