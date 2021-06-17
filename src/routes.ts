/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import { registrationStatusController } from './useCases/RegistratioStatus'

const router = require('express').Router()

router.get('/', (request: Request, response: Response) => {
  return response.status(200).send({ api: 'online' })
})

router.post('/', (request: Request, response: Response) => {
  return registrationStatusController.handle(request, response)
})

export default router
