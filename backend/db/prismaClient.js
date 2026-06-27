require('dotenv').config()

const { PrismaClient } = require('@prisma/client')
//imports the prisma client that was made from the migration (previous push)
//lets us query our db using js not sql
const { PrismaPg} = require('@prisma/adapter-pg')
//prisma sql adapter
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
})
const prisma = new PrismaClient({adapter})
//single instance of the client
module.exports=prisma