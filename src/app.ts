import express from 'express'
import cors from 'cors'
import router from './routes'
import { config } from 'dotenv'
config()

class App {
  public express: express.Application

  constructor () {
    this.express = express()
    this.middleware()
    this.routes()
  }

  private middleware () {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private routes () {
    this.express.use(router)
  }
}

export default new App().express
