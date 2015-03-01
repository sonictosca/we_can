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
/*
  app.config(function(datepickerPopupConfig) {
    datepickerPopupConfig.currentText = 'Oggi';
    datepickerPopupConfig.clearText = 'Elimina';
  });
*/
  app.directive('osidebar', function() {
    return {
      restrict: 'E',
      templateUrl: 'assets/fragment/others-side.html',
      controller: ['$location', function($location) {
        this.attivo = $location.absUrl();
        var indice = this.attivo.lastIndexOf('/');
        this.attivo = this.attivo.substr(indice + 1);
        switch (this.attivo) {
          case 'saas.html':
            this.saas = true;
          break;
          case 'personalizzato.html':
            this.personalizzato = true;
          break;
          case 'hardware.html':
            this.hardware = true;
          break;
          case 'networking.html':
            this.networking = true;
          break;
          case 'locazione.html':
            this.locazione = true;
          break;
          case 'interpretariato.html':
            this.interpretariato = true;
          break;
          case 'traduzioni.html':
            this.traduzioni = true;
          break;
          case 'fidelizzazione.html':
            this.fidelizzazione = true;
          break;
          case 'estetici.html':
            this.estetici = true;
          break;
        }
      }],
      controllerAs: 'oSideCtrl'
    };
  });

  app.directive('gsidebar', function() {
    return {
      restrict: 'E',
      templateUrl: 'assets/fragment/graphics-side.html',
      controller: ['$location', function($location) {
        this.attivo = $location.absUrl();
        var indice = this.attivo.lastIndexOf('/');
        this.attivo = this.attivo.substr(indice + 1);
        switch (this.attivo) {
          case 'graphic_design.html':
            this.design = true;
          break;
          case 'siti.html':
            this.siti = true;
          break;
          case 'sito_mobile.html':
            this.mobile = true;
          break;
          case 'cms.html':
            this.cms = true;
          break;
          case 'commerce.html':
            this.commerce = true;
          break;
          case 'seo.html':
            this.seo = true;
          break;
          case 'sem.html':
            this.sem = true;
          break;
          case 'social_media.html':
            this.social = true;
          break;
          case 'fiere.html':
            this.fiere = true;
          break;
          case 'punti_vendita.html':
            this.punti = true;
          break;
        }
      }],
      controllerAs: 'gSideCtrl'
    };
  });

  app.directive('fondo', function() {
    return {
      restrict: 'E',
      templateUrl: 'assets/fragment/fondo.html'
    };
  });

  app.directive('navigazione', function() {
    return {
      restrict: 'E',
      templateUrl: 'assets/fragment/navigazione.html',
      controller: ['$location', '$log', function($location, $log) {
        this.attivo = $location.absUrl();
        var indice = this.attivo.lastIndexOf("/");
        this.attivo = this.attivo.substr(indice + 1);
        switch (this.attivo) {
          case '':
          case 'index.html':
            this.home = true;
          break;
          case 'about.html':
            this.about = true;
          break;
          case 'grafica.html':
          case 'graphic_design.html':
          case 'siti.html':
          case 'sito_mobile.html':
          case 'cms.html':
          case 'commerce.html':
          case 'seo.html':
          case 'sem.html':
          case 'social_media.html':
          case 'fiere.html':
          case 'punti_vendita.html':
            this.grafica = true;
          break;
          case 'itc_service.html':
          case 'saas.html':
          case 'personalizzato.html':
          case 'hardware.html':
          case 'networking.html':
          case 'locazione.html':
          case 'interpretariato.html':
          case 'traduzioni.html':
          case 'fidelizzazione.html':
          case 'estetici.html':
            this.service = true;
          break;
          case 'case_studies.html':
            this.case = true;
          break;
        }
      }],
      controllerAs: 'navCtrl'
    };
  });

  app.directive('contattoForm', function() {
    return {
      restrict: 'E',
      templateUrl: 'assets/fragment/contatto-form.html',
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
/*
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
  */

})();
