export interface IRegistratioStatusProvider {
    fetchDocumentIdStatus(documentId: string): Promise<Object | Error>
}
