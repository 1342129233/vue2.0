const arr1 = [1, 3, 2, 2, 2, 4]
const arr2 = [3, 5, 2, 2, 10]

// function a(arr1, arr2) {
//   console.log(arr1.filter( v => arr2.includes(v)))
//   return arr1.filter( v => arr2.includes(v))
// }
// a(arr1, arr2)

function a(arr1, arr2) {
  let obj1 = helper(arr1)  // {1:1, 2: 1, 2: 3, 4: 1}
  let obj2 = helper(arr2)  // {3:1, 5: 1, 2: 2, 10: 1}
  let res = ''
  Object.keys(obj1).forEach((key) => {
    if(obj2[key] !== undefined) {
      let min = Math.min(obj1[key],obj2[key])
    }
  })
}

helper(arr) {
  arr.reduce((acc, cur) => {
    if(acc[cur] !== undefined) {
      acc[cur] += 1
    }else {
      acc[cur] = 1
    }
    return acc
  },{})
}
const res = a(arr1, arr2)
console.log(res)


function fun2() {

}
