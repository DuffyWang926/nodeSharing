const model = require('../model');
const fs = require('fs');
const cityArr = require('./chinese_cities')
const {userTip} = require('../constants/userTip')
const chalk = require('chalk')
const log = console.log


let city_init = async (ctx, next) => {
    let name = ctx.request.body.userName || '',
    password = ctx.request.body.userPassword || '';


    let City = model.City;

    // stream = fs.createReadStream(__dirname + '/chinese_cities.json'),
    // data = "";
    // stream.on('data',function(params){
    //     console.log(params, 'params');
    //     // console.log(params.toString());
    //     data += params;
    // });
    // stream.on('end',function(){
    //     // console.log(data);
    //     // console.log(data.toString());
    //     // console.log('finished!!!!');
    //     console.log( data,'data type')
    //     let arrInit = Array.from(data)

    // let test = arrInit

        
    // });
    

    
    let arr = []
    let pid = ''

    let flatObj = (test,arr,pid) =>{
        let objCopy = (k,arr,nextArr,pid) =>{
            let res = {}
            for(let o in k){
                
                if(!k[pid]){
                    if(!pid){
                        res.pid = '0'
                    }else{
                        res.pid = pid
                    }

                }
                if(Array.isArray(k[o])){
                    nextArr = k[o]
                    pid = k.no
                }else{
                    res[o] = k[o]
                }
            }
            arr.push(res)
            let result = {
                arr,
                nextArr,
                pid
            }
            return result
        }
        for(let m in test){
            let nextArr = []
            let k = test[m]
            let result =  objCopy(k,arr,nextArr,pid)
            
            if(result.nextArr.length > 0){
                flatObj(result.nextArr,arr,result.pid)
            }else{
                if(m == (test.length -1)){
                    return arr
                }
            }

        }
    }
    flatObj(cityArr, arr, pid)
    console.log(arr[0],'arr[0]')

    for(let k in arr){
        await City.findOrCreate({
            where: {
                id: arr[k].no,
                name:arr[k].name,
                pid:arr[k].pid,
            },
        });

    }
    let city = ''
    
    
    
    console.log('find: ' + JSON.stringify(city));
    
    if (city.length > 0) {
        ctx.response.body= {
            name:'wefRoot'
        }
    } else {
        ctx.response.body= {
            msg:'用户不存在'
        }
    }
}
module.exports = {
    'GET /cityInit': city_init,
    
};