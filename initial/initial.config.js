function InitialConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('initial', {
    url: '',
    controller: 'InitialCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'initial/initial.html'
  });

};

export default InitialConfig;