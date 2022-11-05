let val1 = "https://www.youtube.com/watch?v=AynKK8rcB_k"
let val2 = "https://www.youtube.com/watch?v=G9QTBS2x8U4"
let val3 = "https://youtu.be/G9QTBS2x8U4"
let val4 = "G9QTBS2x8U4"

let tempIds = val3.split("/")
// console.log(tempIds)

let tempIds2 = []
tempIds.forEach(item=>{
    let tmp = item.split("=")
    tempIds2.push(tmp)
})

let idList = tempIds2.slice(-1)[0];
let formattedId = idList.slice(-1)
console.log(formattedId[0])