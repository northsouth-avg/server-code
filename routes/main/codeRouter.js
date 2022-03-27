const express = require('express');
const router = express.Router();
const CodeOptions = require('../../dbConfig/option/codeOptions');
const CodeModel = require("../../dbConfig/model/CodeModel");
const {PythonShell} = require('python-shell')


//运行代码并保存运行结果：http://localhost:8090/code/codeInfo
router.post('/codeInfo', (req, res) => {
    let code = req.body.data;
    //打印前端传递过来的代码
    // console.log(code);
    let outRes = null;
    PythonShell.runString(code, null, function (err, data) {
        if (err) throw err;
        //
        // console.log(data)
        if (data) {
            outRes = data[0]
        }
        // outRes = data ;
        console.log(outRes);
        CodeModel.create({
            code: code,
            results: outRes,
        }).then(result => {
            res.json({
                code: 1002,
                msg: outRes
            })
        }).catch(err => {
            console.log(err.message);
            res.json({
                code: 1003,
                msg: '当前没有输入代码,无返回结果'
            })
        });
    });
});

//查询历史记录的接口
// http://localhost:8090/code/historyCode
router.get('/historyCode', (req, res) => {
    CodeOptions.findInfo().then(result => {
            res.json(result)
        }
    ).catch(
        err => {
            throw err
        }
    )
})


module.exports = router;