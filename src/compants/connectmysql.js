    const mysql = require('mysql')
    //创建连接对象  
    const connection = mysql.createConnection({
        hots: 'localhost',
        user: 'root',
        password: 'root',
        port: 3306,
        database: 'blogre'
    });

    // 开始连接  
    connection.connect();
    // 执行sql 语句
    const sql = `select * from user`;
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('error', err);
            return;
        }
        console.log('result', result);
    })

    //关闭连接
    connection.end();
