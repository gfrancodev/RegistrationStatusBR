/* eslint-disable handle-callback-err */
/* eslint-disable no-unused-vars */
import express from 'express'
import cors from 'cors'
import router from './routes'

class App {
  public express: express.Application

  constructor () {
    this.express = express()
    this.middleware()
    this.router()
  }

  private middleware () {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private router () {
    this.express.use(router)
  }
}

export default new App().express
