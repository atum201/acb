export function sumArray(array ,prop) {
  var total = 0
  for ( var i = 0, _len = array.length; i < _len; i++ ) {
    total += array[i][prop]
  }
  return total
}

