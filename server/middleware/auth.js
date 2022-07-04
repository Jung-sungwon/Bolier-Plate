
const {User} = require("../models/User")


let auth = (req,res,next) => { //여기에서는 req,res를 못쓰는데 app.get('/api/users/auth'여기서 호출되면 쓸 수 있음.

    //인증 처리를 하는곳

    //클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth

    //토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token, (err, user)=>{
        if(err) throw err
        if(!user) return res.json({isAuth:false, error:true})

        req.token = token
        req.user = user //이걸 굳이 입력함으로서 index.js의 app.get('/api/users/auth' 함수에서 findOne를 통해서 찾은 특정 스키마를 쓸 수 있게됨.
        next()
    })

    //유저가 있으면 인증 ok

    //유저가 없으면 인증 no
}

module.exports = {auth}