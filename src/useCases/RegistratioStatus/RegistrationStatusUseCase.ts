/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import { RegistrationStatusDTO } from './RegistrationStatusDTO'
import { IRegistratioStatusProvider } from '../../providers/IRegistratioStatusProvider'

export class RegistrationStatusUseCase {
  constructor (
        private RegistrationStatusProvider: IRegistratioStatusProvider
  ) {}

  public execute (request: RegistrationStatusDTO): Promise<Object | Error> {
    return this.RegistrationStatusProvider.fetchDocumentIdStatus(request.documentId)
  }
}
