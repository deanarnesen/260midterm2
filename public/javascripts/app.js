/*global axios */
/*global Vue */
var app = new Vue({
  el: '#voting',
  data: {
    candidates: [],
    candidate: '',
    ballot: [],
  },
  created: function() {
    this.getall();
  },
  methods: {
    addCandidate() {
      var url = "http://deanarnesen.com:8080/voting";
      axios.post(url, {
          Name: this.candidate,
          votes: 0
        })
        .then(response => {
          console.log("Post Response ");
          console.log(response.data);
          this.candidates.push(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      console.log(this.candidates);
      this.candidate = "";
    },
    deleteCandidate(candidate) {
      var index = this.candidates.indexOf(candidate);
      if (index > -1) {
        var url = "http://deanarnesen.com:8080/voting/" + candidate._id;
        axios.delete(url)
          .then(response => {
            console.log(response.data.votes);
            this.getall();
          })
          .catch(e => {
            console.log(e);
          });
        console.log("URL " + url);
      }
    },
    upvote(candidate) {
      var url = "http://deanarnesen.com:8080/voting/" + candidate._id + "/upvote";
      console.log("upvote URL " + url);
      axios.put(url)
        .then(response => {
          console.log(response.data.votes);
          candidate.votes = response.data.votes;
        })
        .catch(e => {
          console.log(e);
        });
    },
    async getall() {
      console.log("get all");
      var url = "http://deanarnesen.com:8080/voting"; // This is the route we set up in index.js
      try {
        let response = await axios.get(url);
        this.candidates = response.data; // Assign array to returned response
        console.log(this.candidates);
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
    dovote() {
      console.log("In Dovote");
      for (var candidate of this.candidates) {
        if (candidate.selected) {
          this.upvote(candidate);
          this.ballot.push(candidate);
        }
      }
    },
  }
});


/*
angular.module('voting',[])
.controller('MainCtrl',[
  '$scope','$http',
  function($scope,$http) {
    $scope.candidates = [];
    $scope.ballot = [];
    $scope.getAll = function() {
			return $http.get('/voting').success(function(data){
				angular.copy(data, $scope.candidates);
			});
    };
    $scope.getAll();
    $scope.create = function(candidate) {
			return $http.post('/voting', candidate).success(function(data){
				$scope.candidates.push(data);
			});
    };
    $scope.dovote = function() {
      console.log("In Dovote");
      angular.forEach($scope.candidates, function(value,key) {
        if(value.selected) {
          $scope.upvote(value);
          $scope.ballot.push(value);
        }
      });
    }

    $scope.upvote = function(candidate) {
      return $http.put('/voting/' + candidate._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          candidate.upvotes += 1;
        });
    };

    $scope.addCandidate = function() {
      var newObj = {Name:$scope.formContent,votes:0};
      $scope.create(newObj);
      $scope.formContent = '';
    }

    $scope.incrementUpvotes = function(candidate) {
      $scope.upvote(candidate);
    };
 
    $scope.delete = function(candidate) {
      console.log("Deleting Name "+candidate.Name+" ID "+candidate._id);
      $http.delete('/voting/'+candidate._id)
        .success(function(data){
          console.log("delete worked");
      });
      $scope.getAll();
    };
  }
]);
*/
