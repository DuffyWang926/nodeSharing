const model = require('../model');
const { findUser, creatUser, updateUser } = require('../dealBb/dealUser')
const {userTip} = require('../constants/userTip')
const {mysqlTip} = require('../constants/mysqlTip')
const chalk = require('chalk')
const log = console.log

var fn_index = async (ctx, next) => {
    ctx.render('index.html', {
        title: 'Welcome'
    });
}

var fn_signin = async (ctx, next) => {
    log(chalk.green('register begin'))
    let body = ctx.request.body
    let email = body.email || ''
    let password = body.password || '';
    let user = []
    let code = 200
    let data = []
    let msg = ''

    try {
        user = await findUser(email)
    } catch (e) {
        code = 710
        msg = mysqlTip.findError
        log(chalk.red(msg))
        throw e
    }

    if(user && user.length > 0){
        code = 200
        msg = userTip.userExisted
        

    }else{
        try {
            await creatUser(body)
        } catch (e) {
            code = 711
            msg = mysqlTip.createError
            log(chalk.red(msg))
            throw e
        }
        
    }
    log(chalk.green('register end'))
    ctx.response.body = {
        code,
        data,
        msg
    }
}

let fn_logIn = async (ctx, next) => {
    log(chalk.green('logIn begin'))
    let email = ctx.request.body.email || ''
    let password = ctx.request.body.password || '';
    
    let user = []
    let code = 200
    let data = []
    let msg = ''

    try {
        user = await findUser(email)
        if(user && user.length > 0){
            msg = userTip.logInSuccess
    
        }else{
            code = 401
            msg = userTip.userEmpty
        }
    } catch (e) {
        code = 710
        msg = mysqlTip.findError
        log(chalk.red(msg))
        throw e
    }
    
    log(chalk.green('logIn end'))
    ctx.response.body = {
        code,
        data,
        msg
    }

}

let changeUser = async (ctx, next) => {
    log(chalk.green('changeUser begin'))

    let body  = ctx.request.body
    let user = []
    let code = 200
    let data = []
    let msg = ''

    try {
        user = await updateUser(body)
        if(user && user.length > 0){
            msg = userTip.logInSuccess
    
        }else{
            code = 401
            msg = userTip.userEmpty
        }
    } catch (e) {
        code = 712
        msg = mysqlTip.findError
        log(chalk.red(msg))
        throw e
    }
    
    log(chalk.green('changeUser end'))
    ctx.response.body = {
        code,
        data,
        msg
    }

}


// let test = async (ctx, next) => {
//     const { data } = ctx.request.body
//     console.log(data,'data')
//     let buf = Buffer.from(data,'binary')
    
//     let bufBasse = buf.toString('base64')
//     fs.writeFile("./hello.jpeg",buf,function(err){
//         if(!err){
//             console.log("文件写入成功");
//         }
//     } );
//     ctx.response.body= {
//         data:bufBasse
//     }

    
// }


module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin,
    'POST /logIn': fn_logIn,
    'POST /changeUser': changeUser,
    
};