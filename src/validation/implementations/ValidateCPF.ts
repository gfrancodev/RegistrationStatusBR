/* eslint-disable no-unused-vars */
import { IValidate } from '../IValidate'

export class ValidateCPF implements IValidate {
  public methodBasic (documentId: string):boolean {
    documentId = documentId.replace(/[^\d]+/g, '')

    let SumCPFNumber: number
    let RestCPF: number
    SumCPFNumber = 0
    if (documentId === '00000000000') return false

    for (let i = 1; i <= 9; i++) SumCPFNumber = SumCPFNumber + parseInt(documentId.substring(i - 1, i)) * (11 - i)
    RestCPF = (SumCPFNumber * 10) % 11

    if ((RestCPF === 10) || (RestCPF === 11)) {
      RestCPF = 0
    }

    if (RestCPF !== parseInt(documentId.substring(9, 10))) {
      return false
    }

    SumCPFNumber = 0
    for (let i = 1; i <= 10; i++) {
      SumCPFNumber = SumCPFNumber + parseInt(documentId.substring(i - 1, i)) * (12 - i)
    }

    RestCPF = (SumCPFNumber * 10) % 11

    if ((RestCPF === 10) || (RestCPF === 11)) {
      RestCPF = 0
    }

    if (RestCPF !== parseInt(documentId.substring(10, 11))) {
      return false
    }
    return true
  }
}
