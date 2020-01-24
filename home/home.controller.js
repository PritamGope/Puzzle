class HomeCtrl {
  constructor($scope, $interval) {
    "ngInject";
    /*** Initialise Dom Variables and Global Declare Global Variables ***/
    var title = "Puzzle";
    $scope.val;
    var rw;
    var cl;
    $scope.moves = 0;
    $scope.hour = 0; //parseInt('00',8);
    $scope.min = 0;
    $scope.sec = 0;

    /*** End ***/
    /*** Initialiseation of grid as 2D array, with random no b/w 1 to gril length ***/
    var array2D = [];
    $scope.cofigureGrid = function(len) {
      // len is the user input.
      let size = len * len;
      var arr1 = [];
      while (arr1.length < size - 1) {
        // Generating random Numbers and push to the array.
        var r = Math.floor(Math.random() * size - 1) + 1;
        if (arr1.indexOf(r) === -1 && r != 0) arr1.push(r);
      }
      let indx = 0;
      arr1.push(null);
      if (!checkSolvable(arr1)) {
        //Check if Solveable
        $scope.cofigureGrid(len);
      } else {
        for (let i = 0; i < len; i++) {
          //Coverting 1D to 2D Array;
          array2D[i] = [];
          for (let j = 0; j < len; j++) {
            array2D[i][j] = arr1[indx++];
          }
        }
        $scope.arr = array2D; // Setting view with numbers;
      }
      rw = len - 1;
      cl = len - 1;
      var cardWidth = "width:" + (len * 50 + 2) + "px";
      document.getElementById("container").setAttribute("style", cardWidth); //setting card width according to the no of columns
      document
        .getElementById("hideButtons")
        .setAttribute("style", "display:none"); // Once grid appeare hiding all buttons.
      document
        .getElementById("gridContainer")
        .setAttribute("style", "display:block");
      $interval(myCounter, 1000); // Start Timer
    };
    $scope.reload = function() {
      // Relode Function
      window.location.reload();
    };
    /*** Check If Puzzle is Solveable or Not  ***/
    var checkSolvable = function(pList) {
      //console.log("checkSolvable called with : " + pList);
      var noOfSteps = 0;

      for (let i = 0; i < pList.length; i++) {
        for (let j = i + 1; j < pList.length; j++) {
          if (pList[j] > pList[i]) {
            noOfSteps++;
          }
        }
      }
      //console.log("Steps to solve", noOfSteps);
      if (noOfSteps % 2 == 1) {
        // console.log("It's Unsolvable");
        return false;
      } else {
        //console.log("It's Solvable");
        return true;
      }
    };
    /*** END ***/
    /*** Set The Configuration Of Custom Grid ***/
    $scope.setcofigureGrid = function() {
      //Set the configuration of grid for custom selection.
      if ($scope.val == undefined) {
        document
          .getElementById("inputCstm")
          .setAttribute("style", "display:block");
      } else if ($scope.val < 3) {
        alert("Enter a valid Number");
      } else {
        $scope.cofigureGrid($scope.val);
        document
          .getElementById("inputCstm")
          .setAttribute("style", "display:none");
      }
    };
    /*** END ***/
    /*** Timer Function ***/
    var myCounter = function() {
      ++$scope.sec;
      if ($scope.sec == 60) {
        $scope.sec = 0;
        ++$scope.min;
      }
      if ($scope.min == 60) {
        $scope.min = 0;
        ++$scope.hour;
      }
    };
    /*** END ***/
    /*** After Each Move This Function will Update the DOM Array ***/
    var update = function(rw, cl, val, arr) {
      arr[rw][cl] = val;
      setTimeout(1000);
      checkIfSolved(arr);
    };
    /*** END ***/
    /*** Capturing the Keyboard Response ***/
    document.addEventListener(
      "keydown",
      function(event) {
        if (event.keyCode == 37) {
          // alert('Left was pressed');
          swapLeft(rw, cl, $scope.arr);
          cl++;
          if (cl > $scope.arr[0].length - 1) {
            alertt();
            cl--;
          }
          //console.log("col=",cl)
        } else if (event.keyCode == 38) {
          //alert('Up was pressed');
          swapUp(rw, cl, $scope.arr);
          rw++;
          if (rw > $scope.arr[0].length - 1) {
            alertt();
            rw--;
          }
          // console.log("row=",rw)
          //console.log("Inside",$scope.arr);
        } else if (event.keyCode == 39) {
          //alert('Right was pressed');
          swapRight(rw, cl, $scope.arr);
          cl--;
          if (cl < 0) {
            alertt();
            cl++;
          }
          //console.log("col=",cl)
        } else if (event.keyCode == 40) {
          //alert('Down was pressed');
          swapDown(rw, cl, $scope.arr);
          rw--;
          if (rw < 0) {
            alertt();
            rw++;
          }
          // console.log("row=",rw)
        }
      },
      true
    );
    /*** Left Up Right Down arrow functions configure according to the element near to the empty cell ***/
    var swapLeft = function(rw, cl, arr) {
      if (cl + 1 != arr[0].length) {
        let str = "col" + rw + (cl + 1);
        let temp = arr[rw][cl + 1];
        //console.log("Value",temp,str,arr);
        document.getElementById(str).innerHTML = arr[rw][cl];
        update(rw, cl + 1, arr[rw][cl], arr);
        str = "col" + rw + cl;
        document.getElementById(str).innerHTML = temp;
        update(rw, cl, temp, arr);
        $scope.moves++;
        if (stepsArray.length < 5) {
          stepsArray.push("L");
        } else {
          stepsArray.shift(stepsArray[0]);
          stepsArray.push("L");
        }
      }
    };
    var swapUp = function(rw, cl, arr) {
      if (rw + 1 != arr[0].length) {
        let str = "col" + (rw + 1) + cl;
        let temp = arr[rw + 1][cl];
        //console.log("Value",temp,str,arr);
        document.getElementById(str).innerHTML = arr[rw][cl];
        update(rw + 1, cl, arr[rw][cl], arr);
        str = "col" + rw + cl;
        document.getElementById(str).innerHTML = temp;
        update(rw, cl, temp, arr);
        $scope.moves++;
        if (stepsArray.length < 5) {
          stepsArray.push("U");
        } else {
          stepsArray.shift(stepsArray[0]);
          stepsArray.push("U");
        }
      }
    };
    var swapRight = function(rw, cl, arr) {
      if (cl - 1 != -1) {
        let str = "col" + rw + (cl - 1);
        let temp = arr[rw][cl - 1];
        //console.log("Value",temp,str,arr);
        document.getElementById(str).innerHTML = arr[rw][cl];
        update(rw, cl - 1, arr[rw][cl], arr);
        str = "col" + rw + cl;
        document.getElementById(str).innerHTML = temp;
        update(rw, cl, temp, arr);
        $scope.moves++;
        if (stepsArray.length < 5) {
          stepsArray.push("R");
        } else {
          stepsArray.shift(stepsArray[0]);
          stepsArray.push("R");
        }
      }
    };
    var swapDown = function(rw, cl, arr) {
      if (rw - 1 != -1) {
        let str = "col" + (rw - 1) + cl;
        let temp = arr[rw - 1][cl];
        //console.log("Value",temp,str,arr);
        document.getElementById(str).innerHTML = arr[rw][cl];
        update(rw - 1, cl, arr[rw][cl], arr);
        str = "col" + rw + cl;
        document.getElementById(str).innerHTML = temp;
        //console.log("Value",temp,str,arr);
        update(rw, cl, temp, arr);
        $scope.moves++;
        if (stepsArray.length < 5) {
          stepsArray.push("D");
        } else {
          stepsArray.shift(stepsArray[0]);
          stepsArray.push("D");
        }
        //console.log("final",arr);
      }
    };
    var alertt = function() {
      //Alert for all invalid move
      alert("Invalid Move");
    };
    /*** END ***/
    /*** Check if Puzzle Solved ***/
    var checkIfSolved = function(arrChk) {
      //console.log(arrChk)
      let len = arrChk[0].length;
      // console.log(len,arrChk,arrChk[0])
      var checkArray = [];
      for (let i = 0; i < len; i++) {
        checkArray = checkArray.concat(arrChk[i]);
      }
      var checkFinal = checkArray.slice();
      checkArray.sort();
      if (JSON.stringify(checkArray) == JSON.stringify(checkFinal)) {
        alert("Congratulations!!! Puzzle Solved :-)");
      }
      console.log("Check Array", checkArray, checkFinal);
    };
    /***END ***/
    /*** Undo Steps upto 7 moves***/
    var stepsArray = [];
    $scope.undoSteps = function(arrUndo) {
      let resetMove;
      console.log("rw", rw, "cl", cl, "stepsArray", stepsArray);
      console.log("DOM Array", arrUndo);
      if (stepsArray.length > 0) {
        resetMove = stepsArray[stepsArray.length - 1];
        if (resetMove == "L") {
          stepsArray.pop();
          var e = jQuery.Event("keydown", { keyCode: 39 });
          jQuery("body").trigger(e);
          //swapRight(rw, cl, arrUndo);
        } else if (resetMove == "U") {
          stepsArray.pop();
          var e = jQuery.Event("keydown", { keyCode: 39 });
          jQuery("body").trigger(e);
          //swapDown(rw, cl, arrUndo);
        } else if (resetMove == "R") {
          stepsArray.pop();
          var e = jQuery.Event("keydown", { keyCode: 37 });
          jQuery("body").trigger(e);
         // swapRight(rw, cl, arrUndo);
        } else {
          stepsArray.pop();
          var e = jQuery.Event("keydown", { keyCode: 38 });
          jQuery("body").trigger(e);
          //swapUp(rw, cl, arrUndo);
        }
        stepsArray.pop();
        console.log("stepsArray", stepsArray);
      }
    };
    /***END ***/
  }
}

export default HomeCtrl;
