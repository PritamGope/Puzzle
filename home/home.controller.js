class HomeCtrl {
  constructor($scope) {
    "ngInject";
    //this.name = "AngularJS";
    var shuffle = function(originalArray) {
      var array = [].concat(originalArray);
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    };
    var array2D = [];
    var cofigureGrid = function(len) {
      let size = len*len;
      var arr1 = [];
      while (arr1.length < size-1) {
        var r = Math.floor(Math.random() * size-1) + 1;
        if (arr1.indexOf(r) === -1 && r!=0) arr1.push(r);
      }
      let indx=0;
      arr1.push(null);
      for(let i=0;i<len;i++){
        array2D[i]=[];
        for(let j=0;j<len;j++)
        {
          array2D[i][j]=arr1[indx++];
        }
      }
      console.log("Array Log",array2D);
      return array2D;
    };
    //console.log("Array Log",cofigureGrid(8));




    var arr = [[8, 6, 3], [7, 5, 1], [4, 2, null]];
    $scope.arr = arr;
    var update = function(rw, cl, val, arr) {
      arr[rw][cl] = val;
    };
    // $scope.arr[2][2]=null;
    var rw = 2;
    var cl = 2;

    document.addEventListener(
      "keydown",
      function(event) {
        if (event.keyCode == 37) {
          // alert('Left was pressed');
          swapLeft(rw, cl, arr);
          cl++;
          if (cl > 2) {
            alertt();
            cl--;
          }
          //console.log("col=",cl)
        } else if (event.keyCode == 38) {
          //alert('Up was pressed');
          swapUp(rw, cl);
          rw++;
          if (rw > 2) {
            alertt();
            rw--;
          }
          // console.log("row=",rw)
          //console.log("Inside",$scope.arr);
        } else if (event.keyCode == 39) {
          //alert('Right was pressed');
          swapRight(rw, cl, arr);
          cl--;
          if (cl < 0) {
            alertt();
            cl++;
          }
          //console.log("col=",cl)
        } else if (event.keyCode == 40) {
          //alert('Down was pressed');
          swapDown(rw, cl, arr);
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

    var swapLeft = function(rw, cl, arr) {
      if (cl + 1 != 3) {
        let str = "col" + rw + (cl + 1);
        let temp = arr[rw][cl + 1];
        //console.log("Value",temp,str,arr);
        document.getElementById(str).innerHTML = arr[rw][cl];
        update(rw, cl + 1, arr[rw][cl], arr);
        str = "col" + rw + cl;
        document.getElementById(str).innerHTML = temp;
        update(rw, cl, temp, arr);
      }
    };
    var swapUp = function(rw, cl) {
      if (rw + 1 != 3) {
        let str = "col" + (rw + 1) + cl;
        let temp = arr[rw + 1][cl];
        //console.log("Value",temp,str,arr);
        document.getElementById(str).innerHTML = arr[rw][cl];
        update(rw + 1, cl, arr[rw][cl], arr);
        str = "col" + rw + cl;
        document.getElementById(str).innerHTML = temp;
        update(rw, cl, temp, arr);
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
        //console.log("final",arr);
      }
    };

    var alertt = function() {
      alert("Invalid Move");
    };
  }
}

export default HomeCtrl;
