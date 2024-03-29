var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node'
});

conn.connect(function (err) {
    if (err) throw err;
    console.log("connected to database....");
});

app.get('/', function (req, res) {
    res.render('insert');
});

app.post('/insert', function (req, res) { 
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var sql = `insert into users(user_name,user_email,user_password) values('${name}','${email}','${password}')`;
    conn.query(sql, function (err, result) { 
        if (err) throw err;
        res.redirect('/show');
    });
});

app.get('/show',function(req,res){
    var sql="select * from users";
    conn.query(sql,function(err,results){
        if(err) throw err;
        res.render('show',{users:results});
    });

});

app.get('/delete/:id',function(req,res){
    var id=req.params.id;
    var sql=`delete from users where user_id='${id}'`;
    conn.query(sql,function(err,result){
        if(err) throw err;
        res.redirect('/show');
    });
});

app.get('/edit/:id',function(req,res){
    var id=req.params.id;
    var sql=`select * from users where user_id='${id}'`;
    conn.query(sql,function(err,results){
        if(err) throw err;
        res.render('edit',{users:results});
    });
});

app.post('/update/:id',function(req,res){
    var id=req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var sql=`update users set user_name='${name}',user_email='${email}',user_password='${password}' where user_id='${id}'`;
    conn.query(sql,function(err,results){
        if(err) thiserr;
        res.redirect('/show');
    });
});

var server = app.listen(3005, function () {
    console.log("App Running successfully....");
});
