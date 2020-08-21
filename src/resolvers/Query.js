const { getUserId } = require('../utils')

async function feed(parent, args, context, info) {
  getUserId(context)
  const where = args.filter
  ? {
    OR: [
      { description: { contains: args.filter } },
      { url : { contains: args.filter } }
    ]
  }
  : {}
  const links = await context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy
  })

  const count = await context.prisma.link.count({ where })

  return {
    links,
    count
  }
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