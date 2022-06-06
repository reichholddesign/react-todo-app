const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')
let storedData = [
];

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

  switch(page) {
    case '/':
      serveFile('index.html', 'text/html')
      break;
    case '/otherpage':
        serveFile('otherpage.html', 'text/html')
      break;
    case '/otherotherpage':
        serveFile('otherotherpage.html', 'text/html')
      break;
      case '/api':
        accessApi()
      break;
      case '/css/style.css':
        serveFile('css/style.css')
      break;
      case '/js/main.js':
        serveFile('js/main.js', 'text/javascript')
      break;  
    default:
        serveFile()
  }

function serveFile(returnFile, contentType){
    if(returnFile){
    fs.readFile(returnFile, function(err, data) {
      if(contentType)res.writeHead(200, {'Content-Type': contentType}); // if there is a content type
        res.write(data);
        res.end();
    }); 
    }//if file found
    else{
        figlet('404!!', function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            res.write(data);
            res.end();
          });
    }// else file not found
}

function accessApi(){       
        res.writeHead(200, {'Content-Type': 'application/json'});   
        res.end(JSON.stringify(getData()));
} 

function getData(){
 
    if('date' in params){   
      if(params['date'] === 'all'){
        return storedData;
      } // if - return unfiltered data if client is requesting all data
      
    return todoItem = storedData.filter(todo => todo.date === params['date'])

    } // if - retries task related to a specific date

    else if('new-task-date' in params){
      storedData.push({'date': params['new-task-date'],'todo': params['new-task-name'], 'status': true})
      return storedData;
    } // else if - addd new task 

    else if('todo-date' in params){
      storedData.forEach((todo,i) => {
        if(todo.date === params['todo-date'] && todo.todo === params['todo-task']){
          todo.status = !todo.status
        }
      })
        return storedData
    } // else if - update status of task
    else if('delete' in params){
      console.log('works')
      let index;
      storedData.filter((todo,i) => {
      
        if(todo.date === params['delete-date'] && todo.todo === params['delete-task']){
          index = i;
        }
      
      })
      storedData.splice(index, 1)
      console.log(storedData)
        return storedData
    } // else if - update status of task

} // end of get data func 

});



server.listen(8000);