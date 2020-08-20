const { getUserId } = require('../utils')

function feed(parent, args, context, info) {
  return context.prisma.link.findMany()
}

async function link(parent, {id}, context) {
  const userId = getUserId(context)
  const link = await context.prisma.link.findOne({
    where: {
      postedById: userId
    }
  })

  return link  
}

module.exports = {
  feed,
  link
}