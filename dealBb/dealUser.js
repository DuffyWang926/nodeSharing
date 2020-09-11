const model = require('../model');
let User = model.User;
const { dateFormat } = require('../utils/dateMethod')
async function findUser(email){
    
    let user = await User.findAll({
        where: {
            email
        }
    });
    return user

}

async function creatUser(obj){
    let date = new Date()
    let now = dateFormat(date,"yyyy-MM-dd HH:mm:ss")
    obj.createdAt = now
    obj.updatedAt = now
    obj.userId = obj.email
    obj.id = obj.email
    let userInsert = await User.create(obj);
    return userInsert

}

module.exports = {
    findUser,
    creatUser
}