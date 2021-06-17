/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express'
import { ConnectionException, SintaxeException } from '../../errors'
import { RegistrationStatusUseCase } from './RegistrationStatusUseCase'

export class RegistrationStatusController {
  constructor (
    private RegistrationStatusUseCase: RegistrationStatusUseCase
  ) {}

  public async handle (request: Request, response: Response): Promise<Response> {
    try {
      const data = await this.RegistrationStatusUseCase.execute(request.body)

      return response.status(200).json(data)
    } catch (error) {
      if (error instanceof SintaxeException) {
        return response.status(error.code).json({ code: error.code, error: error.message })
      }

      if (error instanceof ConnectionException) {
        return response.status(error.code).json({ code: error.code, error: error.message })
      }

      return response.status(500).json({ code: 500, error: error.message })
    }
  }
}
