(function () {
  'use strict';
  $(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
      $(".navbar-fixed-top").removeClass("navbar-inverse");
      $(".navbar-fixed-top").addClass("navbar-default");
      $("#bar-logo").css("opacity", 100);
    } else {
      $(".navbar-fixed-top").removeClass("top-nav-collapse");
      $(".navbar-fixed-top").addClass("navbar-inverse");
      $(".navbar-fixed-top").removeClass("navbar-default");
      $("#bar-logo").css("opacity", 0);
    }
  });

  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style')
    msViewportStyle.appendChild(
      document.createTextNode(
        '@-ms-viewport{width:auto!important}'
      )
    )
    document.querySelector('head').appendChild(msViewportStyle);
  }

  WebFont.load({
    google: {
      families: ['Droid Sans', 'Droid Serif']
    }
  });

  var app = angular.module('weCan', []);

  app.directive('contattoForm', function() {
    return {
      restrict: 'E',
      templateUrl: 'contatto-form.html',
      controller: ['$scope', '$log', function($scope, $log) {
        this.messaggio = {};

        this.sendMessage = function() {
          $log.log(this.messaggio);
          this.messaggio = {};
          $scope.contattoForm.$setPristine();
        };
      }],
      controllerAs: 'contattoCtrl'
    };
  });
})();
