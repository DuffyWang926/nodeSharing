const model = require('../model');
let User = model.User;
const { findItem,
    createItem,
    updateItem,
    deleteItem
 } = require('../dealDb/dealDb')
const {userTip} = require('../constants/userTip')
const {mysqlTip} = require('../constants/mysqlTip')
const chalk = require('chalk')
const log = console.log



var createData = async (ctx, next) => {
    log(chalk.green('register begin'))
    let body = ctx.request.body
    let email = body.email || ''
    let password = body.password || '';
    let user = []
    let code = 200
    let data = []
    let msg = ''

    try {
        user = await findItem(User, email)
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
            await creatUser(User, body)
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

let findData = async (ctx, next) => {
    log(chalk.green('logIn begin'))
    let email = ctx.request.body.email || ''
    let password = ctx.request.body.password || '';
    
    let user = []
    let code = 200
    let data = []
    let msg = ''

    try {
        user = await findUser(User, email)
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

let changeData = async (ctx, next) => {
    log(chalk.green('changeUser begin'))
    let body  = ctx.request.body
    let user = []
    let code = 200
    let data = []
    let msg = ''
    let query = { }
    query.userid = body && body.email

    try {
        user = await updateUser(User, body, query)
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

let deleteData = async (ctx, next) => {
    log(chalk.green('changeUser begin'))
    let body  = ctx.request.body
    let user = []
    let code = 200
    let data = []
    let msg = ''
    let query = { }
    query.userid = body && body.email

    try {
        user = await updateUser(User, body, query)
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


module.exports = {
    'POST /findRoom': findData,
    'POST /createRoom': createData,
    'POST /changeRoom': changeData,
    'POST /deleteRoom': deleteData,
    
};