// 
// controller
// 
logRegModule.controller('registerController', ($scope, $http, toastr, $location, $rootScope) => {
	$scope.user = {};

	$scope.user.login = () => {
		console.log('>>>>>>>>>>>>>>>>>>>>>> H1');
		$location.path('/login');
	};

	$scope.user.register = () => {
		console.log('>>>>>>>>>>>>>>>>>>>>>> H2');
		$location.path('/register');
	};
});
