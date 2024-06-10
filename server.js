import express from 'express'
import { dbConnection } from './dbConnection.js'
import userRouter from './modules/user/user.routes.js'
import cors from "cors"
import postRouter from './modules/post/post.routes.js'

const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(postRouter)
app.use((err, req, res, next) => {
  res.json({ error: err })
})
app.get('/', (req, res) => res.send('Hello World!'))
dbConnection()
app.listen(process.env.PORT || port, () => console.log(`Server Running 👾 ¯\\_(ツ)_/¯`))