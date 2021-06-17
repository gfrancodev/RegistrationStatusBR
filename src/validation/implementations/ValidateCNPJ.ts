// eslint-disable-next-line no-unused-vars
import { IValidate } from '../IValidate'

export class ValidateCNPJ implements IValidate {
  public methodBasic (documentId: string):boolean {
    documentId = documentId.replace(/[^\d]+/g, '')

    if (!documentId || documentId.length !== 14 || documentId.match(/^(0+|1+|2+|3+|4+|5+|6+|7+|8+|9+)$/g)) { return false }

    return true
  }
}
