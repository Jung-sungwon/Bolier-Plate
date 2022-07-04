const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const saltRounds = 10
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
})

userSchema.pre("save", function (next) {
  // userSchema가 저장되기 전에 실행이 됨.
  let user = this

  if (user.isModified("password")) {
    //isModified는 변경을 감지함.
    //비밀번호를 암호화 시킨다.

    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err)
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err)
        user.password = hash // hash는 암호화된 user.password를 암호화 한뒤 user.password에 할당해줌.
        next() //이걸 쓰면 save 함수로 보냄.
      })
    })
  } else {
    next()
  }
})

userSchema.methods.comparePassword = function (plainPassword, cb) {
  //construct 함수에 대해 알아볼것

  //plainPassword 1234567
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}
userSchema.methods.generateToken = function (cb) {
  let user = this

  // jsonwebtoken을 이용해서 토큰 생성하기.

  let token = jwt.sign(user._id.toHexString(), "secretToken")
  user.token = token
  user.save(function (user, err) {
    if (err) return cb(err)
    cb(null, user)
  })
}

userSchema.statics.findByToken = function (token, cb) {
  let user = this

  //토큰을 decode한다.
  jwt.verify(token, "secretToken", function (err, decoded) {
    //복호화 한 코드가 decode에 담김
    //유저 아이디를 이용해서 유저를 찾은 다음에
    //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err)
      cb(null, user)
    })
  })
}

const User = mongoose.model("User", userSchema)

module.exports = { User }
