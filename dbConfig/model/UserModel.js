const Sequelize = require('sequelize');

const adminSequelize = require('../config/config');

//定义AdminModel模型
const UserModel = adminSequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: 'username'
    },
    pwd: {
        type: Sequelize.STRING(255),
        allowNull: false,
        field: 'pwd'
    },
    tname:{
        type:Sequelize.STRING(100),
        allowNull:false,
        field:'tname'
    },
    age:{
        type:Sequelize.INTEGER,
        allowNull:false,
        field:'age'
    },
    gender:{
        type:Sequelize.STRING(10),
        allowNull:false,
        field:'gender'
    },
    school:{
        type:Sequelize.STRING(255),
        allowNull:false,
        field:'school'
    },
    discipline:{
        type:Sequelize.STRING(255),
        allowNull:false,
        field:'discipline'
    },
    grade:{
        type:Sequelize.STRING(10),
        allowNull:false,
        field:'grade'
    }
},{
    freezeTableName:true,
    timestamps:false
});

module.exports = UserModel;