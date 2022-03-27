const CodeModel = require('../model/CodeModel');
const Op = require('sequelize').Op;


//定义对象保存操作
const CodeOptions = {
    //1.查询code表中的信息
    findInfo: function () {
        return CodeModel.findAll({
            attributes: ['id', 'code','results']
        });
    },
    //2.向code表中添加数据
    insertInfo: function (params) {
        return CodeModel.create(params);
    },
}

module.exports = CodeOptions;