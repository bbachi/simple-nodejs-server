const http = require('http')
const qs = require('querystring') 
const url = require('url') 

const Users = require('./users');

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3030

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        return handleGetReq(req, res)
    } else if (req.method === 'POST') {
        return handlePostReq(req, res)
    } else if (req.method === 'DELETE') {
        return handleDeleteReq(req, res)
    } else if (req.method === 'PUT') {
        return handlePutReq(req, res)
    }
})

function handleGetReq(req, res) {
    const { pathname } = url.parse(req.url)
    if (pathname !== '/users') {
        return handleError(res, 404)
    }
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    return res.end(JSON.stringify(Users.getUsers()))
}

function handlePostReq(req, res) {

    const size = parseInt(req.headers['content-length'], 10)
    const buffer = Buffer.allocUnsafe(size)
    var pos = 0

    const { pathname } = url.parse(req.url)
    if (pathname !== '/user') {
        return handleError(res, 404)
    }

    req 
    .on('data', (chunk) => { 
      const offset = pos + chunk.length 
      if (offset > size) { 
        reject(413, 'Too Large', res) 
        return 
      } 
      chunk.copy(buffer, pos) 
      pos = offset 
    }) 
    .on('end', () => { 
      if (pos !== size) { 
        reject(400, 'Bad Request', res) 
        return 
      } 
      const data = JSON.parse(buffer.toString())
      
      Users.saveUser(data)
      console.log('User Posted: ', data) 
      res.setHeader('Content-Type', 'application/json;charset=utf-8');
      res.end('You Posted: ' + JSON.stringify(data))
    })
}

function handleDeleteReq(req, res) {
    const { pathname, query } = url.parse(req.url)
    if (pathname !== '/user') {
        return handleError(res, 404)
    }
    const { id } = qs.parse(query)
    const userDeleted = Users.deleteUser(id);
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.end(`{"userDeleted": ${userDeleted}}`)
}

function handlePutReq(req, res) {
    
    const { pathname, query } = url.parse(req.url)
    if (pathname !== '/user') {
        return handleError(res, 404)
    }
    const { id } = qs.parse(query)
    const size = parseInt(req.headers['content-length'], 10)
    const buffer = Buffer.allocUnsafe(size)
    var pos = 0
    req 
    .on('data', (chunk) => { 
      const offset = pos + chunk.length 
      if (offset > size) { 
        reject(413, 'Too Large', res) 
        return 
      } 
      chunk.copy(buffer, pos) 
      pos = offset 
    }) 
    .on('end', () => { 
      if (pos !== size) { 
        reject(400, 'Bad Request', res) 
        return 
      } 
      const data = JSON.parse(buffer.toString())
      
      const userUpdated = Users.replaceUser(id, data);
      res.setHeader('Content-Type', 'application/json;charset=utf-8');
      res.end(`{"userUpdated": ${userUpdated}}`)
    })
}

function handleError (res, code) { 
    res.statusCode = code 
    res.end(`{"error": "${http.STATUS_CODES[code]}"}`) 
} 

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});