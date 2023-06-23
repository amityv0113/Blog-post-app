var jwt = require('jsonwebtoken')
const privateKey = 'Amit@key'

const fetchuser = (request, response, next) => {
    // Get user from the jwt token and add id to request object
    const token = request.header("auth-token")
    if (!token){
        response.status(401).send({error:"Please authenticate using valid token"})
    }

    try{
        const data= jwt.verify(token, privateKey)
        request.user = data.user
        next()
    }catch(e){
        console.error(e.message)
        response.send(401)
    }
    
}

module.exports = fetchuser