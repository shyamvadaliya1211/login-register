// 
// controller
// 
logRegModule.controller('registerController', ($scope, $http, toastr, $location, $rootScope) => {
	$scope.user = {};

	$scope.user.login = () => {
		$location.path('/login');
	};

	$scope.user.register = () => {
		$location.path('/register');
	};



	//-----------------------------------------------------------------------------------
	// Register Section
	//-----------------------------------------------------------------------------------

	$scope.user.reg = {};
	$scope.user.reg.model = {};
	$scope.user.reg.isSubmit = false;
	$scope.user.reg.isLoading = false;
	$scope.user.reg.submit = (form) => {
		if (!form.$valid) {
			$scope.user.reg.isSubmit = true;
			return;
		}

		$scope.user.reg.isSubmit = false;
		$scope.user.reg.isLoading = true;
		$http.post('/api/v1/user/register', $scope.user.reg.model).then((response) => {
			if (response && response.data && response.data.status) {
				toastr.success('Please check your email.', 'Register success');
				$scope.user.reg.isLoading = false;
				$location.url('login');
			} else {
				toastr.error(response.data.msg);
				$scope.user.reg.isLoading = false;
			}
		});
	};



	//-----------------------------------------------------------------------------------
	// Login Section
	//-----------------------------------------------------------------------------------

	$scope.user.lg = {};
	$scope.user.lg.model = {};
	$scope.user.lg.isSubmit = false;
	$scope.user.lg.submit = (form) => {
		console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', form.$valid);
		if (!form.$valid) {
			$scope.user.lg.isSubmit = true;
			return;
		}

		$scope.user.lg.isSubmit = false;
	};
});
