const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info){
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.user.create({
    data: {
      ...args,
      password
    }
  })

  const token = jwt.sign({iserId: user.id }, APP_SECRET)
  return {
    token,
    user
  }
}

async function login(parent, args, context, info){
  const user = await context.prisma.user.findOne({
    where: {
      email: args.email
    }
  })

  if(!user){
    throw new Error(" No such user found")
  }

  const valid = bcrypt.compare(args.password, user.password)
  if (!valid){
    throw new Error("Invalid Password!")
  }

  const token = jwt.sign({userId: user.id}, APP_SECRET)
  return {
    token,
    user
  }
}

async function post (parent, args, context) {
  const { url, description } = args
  const userId = getUserId(context)
  const newLink = await context.prisma.link.create({
    data: {
      url,
      description,
      postedBy: {
        connect: { id: userId }
      }
    }
  })
  return newLink
}


module.exports = {
  signup,
  login,
  post
}