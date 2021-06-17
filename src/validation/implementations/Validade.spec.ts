import { ValidateCNPJ } from './ValidateCNPJ'
import { ValidateCPF } from './ValidateCPF'

/* eslint-disable no-undef */
describe('Registration Status Document ID Verify Methods', (): void => {
  it('Testing verify is Valid CPF', (): void => {
    const testingSuccess = new ValidateCPF().methodBasic('863.631.595.63')
    expect(testingSuccess).toBe(true)

    const testingFailed = new ValidateCPF().methodBasic('863.63.595.63')
    expect(testingFailed).toBe(false)

    const testingRepeatNumverCPF = new ValidateCPF().methodBasic('000.000.000-00')
    expect(testingRepeatNumverCPF).toBe(false)
  })

  it('Testing verify is Valid CNPJ', (): void => {
    const testingSuccess = new ValidateCNPJ().methodBasic('60701190000104')
    expect(testingSuccess).toBe(true)

    const testingFailed = new ValidateCNPJ().methodBasic('60.701.190/0004')
    expect(testingFailed).toBe(false)

    const testingRepeatNumverCPF = new ValidateCNPJ().methodBasic('00.000.000/0001-00')
    expect(testingRepeatNumverCPF).toBe(true)
  })
})
