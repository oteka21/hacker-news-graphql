function links(parent, args, context){
  return context.prisma.user.findOne({
    where: { id: parent.id }
  }).links()
}

function votes(parent, args, context){
  return context.prisma.user.findOne({where: { id: parent.id } }).votes()
}

module.exports = {
  links,
  votes
}