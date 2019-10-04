// 
// controller
// 
logRegModule.controller('registerController', ($scope, $http, toastr, $location, $rootScope) => {

	$scope.rg = {};
	$scope.rg.loginClick = () => {
		console.log('>>>>>>>>>>>>>>>>>>>>.. H1');
		// $stateProvider.state('home');
		$location.path('Home');
	}
});
