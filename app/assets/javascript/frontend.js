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

  var app = angular.module('weCan', ['ui.bootstrap', 'angularFileUpload']);

  app.config(function(datepickerPopupConfig) {
    datepickerPopupConfig.currentText = 'Oggi';
    datepickerPopupConfig.clearText = 'Elimina';
  });

  app.directive('navigazione', function() {
    return {
      restrict: 'E',
      templateUrl: 'navigazione.html',
      controller: ['$location', '$log', function($location, $log) {
        this.attivo = $location.absUrl();
        var indice = this.attivo.lastIndexOf("/");
        this.attivo = this.attivo.substr(indice + 1);
        if (this.attivo === 'index.html') {
          this.home = true;
        } else if (this.attivo === 'about.html') {
          this.about = true;
        }
        $log.log(this.attivo);
      }],
      controllerAs: 'navCtrl'
    };
  });

  app.directive('contattoForm', function() {
    return {
      restrict: 'E',
      templateUrl: 'contatto-form.html',
      controller: ['$scope', '$log', '$http', function($scope, $log, $http) {
        this.messaggio = {};
        this.successo = false;
        this.failure = false;
        var that = this;

        this.sendMessage = function() {
          that.successo = false;
          that.failure = false;
          $http.post('http://localhost:8000/api/messaggio', this.messaggio).
            success(function(data, status, headers, config) {
              $log.log('La risposta ricevuta è ' + data);
              that.successo = true;
            }).
            error(function(data, status, headers, config) {
              $log.log('No buono');
              that.failure = true;
            });
          $log.log(this.messaggio);
          this.messaggio = {};
          $scope.contattoForm.$setPristine();
        };
      }],
      controllerAs: 'contattoCtrl'
    };
  });

  app.controller('NewsController', ['$scope', '$log', '$upload', function($scope, $log, $upload) {

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    }

    this.sendMessage = function() {
      $log.log(this.contenuto);
      var file = $scope.newsCtrl.contenuto.immagine[0];
      $scope.upload = $upload.upload({
        url: 'http://localhost:8000/news',
        method: 'POST',
        data: {contenuto: $scope.newsCtrl.contenuto},
        file: file
      }).progress(function(evt) {
        console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file : ' + evt.config.file.name);
      }).success(function(data, status, headers, config) {
        console.log('file ' + config.file.name + ' is uploaded sucessfully. Response: ' + data);
      });
    };
  }]);

})();
