const UserModel = require('../model/UserModel');
const Op = require('sequelize').Op;


//定义对象保存操作
const UserOptions = {
    //1.查询user表中的信息
    findInfo: function () {
        return UserModel.findAll({
            attributes: ['id', 'username', 'pwd']
        });
    },
    //2.向admin表中添加数据
    insertInfo: function (params) {
        return UserModel.create(params);
    },
    // 3.删除admin表中的某个用户
    delInfo: function (id) {
        return UserModel.destroy({
            where: {
                id: id
            }
        });
    },
    // 4.修改admin表中的某条数据
    updateInfo: function (params) {
        return UserModel.update(params, {
            where: {
                id: params.id
            }
        });
    },
    //5.批量删除
    batchDel: function (arr) {
        return UserModel.destroy({
            where: {
                id: {
                    [Op.in]: arr
                }
            }
        })
    },
    //6.登录验证
    loginVerify: function () {
        return UserModel.findAll({
            attributes: ['username', 'password']
        })
    }
}

module.exports = UserOptions;