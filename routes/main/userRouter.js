const express = require('express');
const router = express.Router();
const UserOptions = require('../../dbConfig/option/userOptions');
const UserModel = require("../../dbConfig/model/UserModel");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

//查询user表中的数据：http://localhost:8090/option/findInfo
router.get('/findInfo', (req, res, next) => {
    // let uname = req.query.username;
    // let password = req.query.password;
    UserOptions.findInfo().then(result => {
        res.json(result);
    }).catch(err => {
        throw  err
    });
});


//注册接口 http://localhost:8090/option/register
router.post('/register', (req, res) => {
    let username = req.body.username;
    let pwd = req.body.userPwd;
    let tname = req.body.tname;
    let age = req.body.age;
    let gender = req.body.gender;
    let school = req.body.school;
    let discipline = req.body.discipline;
    let grade = req.body.grade;
    // console.log(username, pwd);

    // 使用摘要算法对密码加密
    let md5 = crypto.createHash('md5'); // 创建md5对象
    let md5_password = md5.update(pwd).digest('hex'); //对密码加密，生成16进制的字符串
    //将用户信息和加密后的密码保存到数据库
    UserModel.create({
        username: username,
        pwd: md5_password,
        tname: tname,
        age: age,
        gender: gender,
        school: school,
        discipline: discipline,
        grade: grade
    }).then(result => {
        res.json({
            code: 1002,
            msg: '注册成功'
        })
    }).catch(err => {
        console.log(err.message);
        res.json({
            code: 1003,
            msg: '注册失败'
        })
    });
});

//登录接口 http://localhost:8090/option/login
router.post('/login', (req, res) => {
    let username = req.body.username;
    let pwd = req.body.userpwd;

    // console.log(username,pwd)

    let md5 = crypto.createHash('md5');
    let md5_password = md5.update(pwd).digest('hex');

    //查找用户，验证密码
    UserModel.findAll({
        where: {
            username: username
        },
        raw: true
    }).then(result => {
        if (result.length !== 0) { //找到了数据
            if (result[0].pwd === md5_password) {  //密码正确
                //生成token信息
                let login_token = jwt.sign(result[0], 'gq', {
                    expiresIn: 2000 //保存时间
                })

                res.json({
                    code: 1004,
                    msg: '登陆成功',
                    token: login_token
                })
            } else {
                res.json({
                    code: 1005,
                    msg: '密码错误，登录失败'
                })
            }
        } else {
            res.json({
                code: 1007,
                msg: '用户名不存在'
            })
        }
    }).catch(err => {
        console.log(err)
    })
});

module.exports = router;