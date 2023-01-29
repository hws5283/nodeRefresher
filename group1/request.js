const http = require('http'); //allows creation of web servers,

//req,res passed by nodejs

//this code block is why we use express js to simplify this 
const server = http.createServer((req,res) => {
    console.log('Incoming request');
    console.log(req.method, req.url);

    if(req.method === 'POST'){
        let body = ''
        req.on('end', ()=>{
            console.log(body);
            const userName = body.split('=')[1];
            res.end('<h1>' + userName + '</h1>');
        })
        req.on('data', (chunk) => {
            body+=chunk;
        });

    }else{
        res.setHeader('Content-Type', 'text/html');
        res.end('<form method = "POST"><input type = "text" name = "username"><button>Create User</button</form>');
    }
    
});

server.listen(5000);
//opens local server on your machine not exposed to internet 
//can then send requests to this server 