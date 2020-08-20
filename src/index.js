const { GraphQLServer } = require("graphql-yoga")
const path = require('path')
const { PrismaClient } = require('@prisma/client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')

const resolvers = {
    Query,
    Mutation,
    User,
    Link
  // Query: {
  // },
  // Mutation: {
  // }
}

const prisma = new PrismaClient()

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, 'schema.graphql'),
  resolvers,
  context:(request) => ({
    ...request,
    prisma
  })
})

const port = 3000

server.start({
  port
},() => console.log(`Server is running on http://localhost:${port}`))
