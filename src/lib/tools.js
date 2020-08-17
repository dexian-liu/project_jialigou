function convertStrToObj(str){
    if(!(str)){
        return {};
    }else{
        return JSON.parse(str);
    }
}