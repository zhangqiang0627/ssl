let mysql = require("mysql");
let dbSetting = require("../config/db.json");

let pool = mysql.createPool({
    host: dbSetting.host,
    user: dbSetting.user,
    password: dbSetting.password,
    database: dbSetting.database,
    port: dbSetting.port
});

exports.query = function (sqlCommand, callback) {
	pool.getConnection(function(c_err,conn){
        if(c_err){
            callback(c_err,null,null);
        }else{
            conn.query(sqlCommand,function(q_err,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(q_err,vals,fields);
            });
        }
    });
};

exports.insert = function (sqlCommand, sqlParameters, callback) {
	pool.getConnection(function(c_err,conn){
        if(c_err){
            callback(c_err,null,null);
        }else{
            conn.query(sqlCommand, sqlParameters, function(q_err,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(q_err,vals,fields);
            });
        }
    });
};

exports.update = function (sqlCommand, sqlParameters, callback) {
	pool.getConnection(function(c_err,conn){
        if(c_err){
            callback(c_err,null,null);
        }else{
            conn.query(sqlCommand, sqlParameters, function(q_err,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(q_err,vals,fields);
            });
        }
    });
};

exports.delete = function (sqlCommand, callback) {
	pool.getConnection(function(c_err,conn){
        if(c_err){
            callback(c_err,null,null);
        }else{
            conn.query(sqlCommand,function(q_err,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(q_err,vals,fields);
            });
        }
    });
};