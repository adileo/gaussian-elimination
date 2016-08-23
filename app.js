
//var example = [ [1,2,3,1,1,4],[1,2,3,2,3,-2], [1,1,1,1,1,-2],[-3,-5,-7,-4,-5,0] ];
var example = [ [1,-2,0,0,5], [-1,2,-3,0,-2], [0,-2,3,-4,-11], [0,0,-3,4,15] ];
//var example = [ [2,1,-1,0], [4,-1,0,0], [1, 1/2, -1, -3/2] ];
//var example = [ [1,1,-1/2,1], [2,-1,1,2], [2,-4,3,2] ];

//i = riga di partenza = 0
//j = colonna di partenza = 0
function gauss(matrix, i, j){

  //Se pivot == 0, scambio riga
  if(matrix[i][j] == 0){
    console.info("Pivot ("+i+","+j+") = 0");
    var found = false;
    for(var ii = i+1; ii < matrix.length; ii++ ){
      //se pivot != 0 -> swap delle righe
      if (matrix[ii][j] != 0 && ii != i){
        found = true;
        console.info("Swap riga "+ (i) +" con " + (ii));
        matrix = transpose(matrix, i, ii);
        break;
      }
    }
  }

  //Se pivot != 0 (anche perchè ho swappato prima)
  if(matrix[i][j] != 0){
    console.info("Pivot ("+i+","+j+") != 0")
    //Se non sono all'ultima riga
    if(i != matrix.length-1){
        var a = matrix[i][j];
        for(var ii = i+1; ii < matrix.length; ii++ ){
          var b = matrix[ii][j];
          if(b != 0){
            console.info("Semplifico la riga "+ ii + " sottraendo il prodotto della riga " + i +" con "+(-b)/a)
            matrix[ii] = vector_sum(matrix[ii] , vector_product(matrix[i], (-b)/a) );
            console.info(matrix);
          }

        }
    }else{

      console.info("Calcolo ultima riga poichè non è in scala")
      var a = matrix[i-1][j];
      var b = matrix[i][j];
      matrix[i] = vector_sum(matrix[i] , vector_product(matrix[i-1], (-b)/a) );

    }

  }
  //Se in scala ritorno la matrice, poichè dopo una moltiplicazione può darsi che tutte le righe vadano in scala
  if(is_reduced(matrix)){
    return matrix;
  }else{
    console.info("Ricorsione su gauss i="+(i+1)+", j="+(j+1))
    matrix = gauss(matrix, i+1, j+1);
    return matrix;
  }

}

//Controlla se la matrice è ridotta a scala
function is_reduced(matrix){
  var maxlen = matrix[0].length;
  var prevspace = 0;
  for (var i = 0; i < matrix.length; i++){
    for (var j = 0; j < maxlen; j++){
      if (matrix[i][j] != 0 && i != 0){
        if(j > prevspace){
          prevspace = j;
        }else{
          return false;
        }
        break;
      }
    }
  }
  return true;
}

function transpose(matrix, row1, row2){
  var temp = matrix[row1];
  matrix[row1] = matrix[row2];
  matrix[row2] = temp;
  return matrix;
}

function vector_product(vector, scalar){
  var v = [];
  for( var i = 0; i < vector.length; i++){
    v[i] = vector[i] * scalar;
  }
  return v;
}

function vector_sum(vector1, vector2){
  var vector = [];
  for( var i = 0; i < vector1.length; i++){
    vector[i] = vector1[i] + vector2[i];
  }
  return vector;
}
//gauss(example);

function rank(matrix){
  var r = matrix.length;
  for(var i = 0; i < matrix.length; i++){
    var allzero = true;
    for(var j = 0; j < matrix.length; j++){
      if(matrix[i][j] != 0){
        allzero = false;
      }
    }
    if(allzero == true){
      r--;
    }

  }
  return r;
}

console.log(example);
var m = gauss(example,0,0);
console.log(m);
console.log(rank(m));
