
const { dateFormat } = require('../utils/dateMethod')
const chalk = require('chalk')
const log = console.log
async function findItem(User, email){
    let user = {}
    try {
        user = await User.findAll({
            where: {
                email
            }
        });
    } catch (e) {
        log(chalk.red(e))
        throw e
    }
    return user
}

async function createItem(User, obj){
    let date = new Date()
    let now = dateFormat(date,"yyyy-MM-dd HH:mm:ss")
    obj.createdAt = now
    obj.updatedAt = now
    obj.userId = obj.email
    obj.id = obj.email

    let userInsert = {}
    try {
        user = await User.create(obj);
    } catch (e) {
        log(chalk.red(e))
        throw e
    }
    return userInsert
}

async function updateItem(User, obj, query){
    let date = new Date()
    let now = dateFormat(date,"yyyy-MM-dd HH:mm:ss")
    obj.createdAt = now
    obj.updatedAt = now
    obj.userId = obj.email
    obj.id = obj.email
    let userUpdate = {}
    
    try {
        userUpdate = await User.update(
            {
                ...obj
            }, {
              where:{...query }
            }
          )
    } catch (e) {
        log(chalk.red(e))
        throw e
    }
    return userUpdate
}

async function deleteItem(User, obj){
    let userUpdate = {}
    try {
        userUpdate = await User.destroy(
            {
              where:{ userId:obj.email}
            }
          )
    } catch (e) {
        log(chalk.red(e))
        throw e
    }
    return userUpdate
}



module.exports = {
    findItem,
    createItem,
    updateItem,
    deleteItem
}