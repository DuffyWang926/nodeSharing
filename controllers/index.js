const model = require('../model');
const fs = require('fs');
const cityArr = require('./chinese_cities')
const { findUser, creatUser } = require('../dealBb/dealUser')
const {userTip} = require('../constants/userTip')

var fn_index = async (ctx, next) => {
    ctx.render('index.html', {
        title: 'Welcome'
    });
}

var fn_signin = async (ctx, next) => {
    let body = ctx.request.body
    let email = body.email || ''
    let password = body.password || '';
    
    let user = await findUser(email) || []
    let code = 200
    let data = []
    let msg = ''

    if(user && user.length > 0){
        code = 200
        msg = userTip.userExisted
        

    }else{
        let userInsert = await creatUser(body)
    }
    
    ctx.response.body = {
        code,
        data,
        msg
    }
}

let fn_logIn = async (ctx, next) => {
    let email = ctx.request.body.email || ''
    let password = ctx.request.body.password || '';
    
    let user = await findUser(email)
    let code = 200
    let data = []
    let msg = ''

    if(user && user.length > 0){

    }else{
        code = 401
        msg = userTip.userEmpty
    }
    
    ctx.response.body = {
        code,
        data,
        msg
    }
}

let test = async (ctx, next) => {
    const { data } = ctx.request.body
    console.log(data,'data')
    let buf = Buffer.from(data,'binary')
    
    let bufBasse = buf.toString('base64')
    fs.writeFile("./hello.jpeg",buf,function(err){
        if(!err){
            console.log("文件写入成功");
        }
    } );
    ctx.response.body= {
        data:bufBasse
    }

    
}

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
    'GET /': fn_index,
    'GET /cityInit': city_init,
    'POST /signin': fn_signin,
    'POST /logIn': fn_logIn,
    'POST /test': test,
};