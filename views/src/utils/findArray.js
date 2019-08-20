export default function isFoundArray(array, index){
    array.find(function(e) {
      return e === index ? true : false;
    })
}