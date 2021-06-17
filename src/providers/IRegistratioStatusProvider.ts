export interface IRegistratioStatusProvider {
    fetchDocumentStatus(documentId: string): Promise<Object | Error>
}
