function newLinkSubscribe(parent, args, context, info){
  return context.pubSub.asyncIterator("NEW_LINK")
}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: payload => payload
}


function newVoteSubscribe(parent, args, context, info) {
  return context.pubSub.asyncIterator("NEW_VOTE")
}

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: payload => payload
}

module.exports = {
  newLink,
  newVote
}