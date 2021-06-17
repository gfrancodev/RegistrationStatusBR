import { RegistrationStatusProvider } from '../../providers/implementations/RegistrationStatusProvider'
import { ValidateCNPJ, ValidateCPF } from '../../validation/implementations'
import { RegistrationStatusUseCase } from './RegistrationStatusUseCase'
import { RegistrationStatusController } from './RegistratioStatusController'

const validadeCPF = new ValidateCPF()
const validadeCNPJ = new ValidateCNPJ()

const registrationStatusProvider = new RegistrationStatusProvider(
  validadeCPF,
  validadeCNPJ
)

const registrationStatusUseCase = new RegistrationStatusUseCase(
  registrationStatusProvider
)

const registrationStatusController = new RegistrationStatusController(
  registrationStatusUseCase
)

export { registrationStatusUseCase, registrationStatusController }
