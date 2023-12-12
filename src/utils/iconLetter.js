const iconLetters = (name)=>{
    let arr = name.trim().split(" ")
    if(arr.length>=2){
        return arr[0][0].toUpperCase() + arr[1][0].toUpperCase()
    }else{
        return arr[0][0].toUpperCase() + arr[0][1].toUpperCase()
    }
}

export {iconLetters}