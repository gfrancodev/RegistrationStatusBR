/* eslint-disable */
import { launch } from 'puppeteer'
import { encode } from 'querystring'
import { ConnectionException, SintaxeException } from '../../errors'
import { IValidate } from 'src/validation/IValidate'
import userAgents from 'top-user-agents'
import { IRegistratioStatusProvider } from '../IRegistratioStatusProvider'

class RegistrationStatusProvider implements IRegistratioStatusProvider {
    /**
   * The site is ensured by Clouflare, the headers informed 
   * and a dynamic userAgent is required to be able to bypass 
   * the cloudflare.
   * 
   * So that there are no interruptions in the requests, it is
   * necessary to use a Proxy. I recommend ProxyCrawl 
   * services: https://proxycrawl.com/.
   */
  protected url = 'https://www.situacao-cadastral.com/'
  protected userAgent = userAgents[Math.floor(Math.random() * (userAgents.length - 1) + 1)]
  protected headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'user-agent': `${this.userAgent}`,
    'upgrade-insecure-requests': '1',
    origin: 'https://www.situacao-cadastral.com',
    referer: 'https://www.situacao-cadastral.com/',
    'sec-fetch-user': '?1',
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9,en;q=0.8'
  }

  constructor(
    private validateCPF: IValidate,
    private validateCNPJ: IValidate
  ){}

  async fetchDocumentIdStatus (documentId: string): Promise<Object | Error> {

    const CNPJ = this.validateCNPJ.methodBasic(documentId)
    const CPF = this.validateCPF.methodBasic(documentId)

    if (!CNPJ && !CPF) { throw new SintaxeException('') }

    const browser = await launch()
    const pageInitial = await browser.newPage(); 
    await pageInitial.setExtraHTTPHeaders(this.headers); 
    await pageInitial.goto(this.url)
   
    const ByPassToken = await pageInitial.evaluate( () => {
      /**
       * All javascript code running inside this function will be executed in the 
       * chromium console, so it is necessary that the typescript ignore the syntax 
       * check of the lines below 
       */

      /**
       * FingerprintJS is a browser fingerprinting library that queries 
       * browser attributes and computes a hashed visitor identifier from them. 
       * fp2 generates the fingerprintId.
       */
      // @ts-ignore 
      const fp2 = []; new Fingerprint2().get(function (result: string, _components: any) { return fp2.id = result });      
      /**
       * In the request an individual token is requested which requires the 
       * fingerprintId and other browser attributes which together 
       * are encrypted in base64.
       * 
       * The final 3 elements that make up the token refer to the variables 
       * below that start by default with the following values: 
       * 
       *    var blnADB = -1;
       *    var blnFKE = -1;
       *    var blnMSE = -1;
       * 
       * Since all data entered are in accordance with the conditions 
       * reported in the file: https://www.situacao-cadastral.com/js/ed4747635043755e264e1e0e391b070716239391902519.js
       * the variables informed above receive the value equal to 0.
       */
      // @ts-ignore 
      return window.btoa(fp2.id + '|' + navigator.userAgent + '|' + document.URL + '|' + document.referrer + '|' + navigator.cookieEnabled + '|' + screen.width + 'x' + screen.height + 'x' + screen.colorDepth + '|' + $(window).width() + 'x' + $(window).height() + '|' + 0 + '|' + 0 + '|' + 0)
    })   
    /**
     * The site is MPA (Mult Page Application) and receives as the 
     * body of the POST Method request a query string consisting of 
     * the document id (CPF/CNPJ - BR) and a key that receives our ByPassToken.
     */
    const pageResult = await browser.newPage(); 
    await pageResult.setRequestInterception(true)
    pageResult.on('request', async (interceptedRequest) => {
      const requestBodyToQuery = encode({ doc: documentId, '1ff1de774005f8da13f42943881c655f': ByPassToken  })
      const data = { headers: this.headers, method: 'POST', postData: requestBodyToQuery }
      await interceptedRequest.continue(data)
    })
    await pageResult.goto(this.url); 

    let result

    if (CPF) {
      result = await pageResult.evaluate(() => { //@ts-ignore
        if (document.getElementById('mensagem') === "CNPJ inválido" ) { 
          return { error: "invalid" } 
        }

        if (document.getElementById('mensagem') !== null ) { 
          return { error: "connection" } 
        }

        let status = document.getElementsByTagName('span')[2].innerText.split(': ')[1]

        if (status === undefined) { status = document.getElementsByTagName('u')[0].innerText }

        return { //@ts-ignore
          doc: document.getElementsByTagName('span')[0].innerText,//@ts-ignore 
          authority: document.getElementsByTagName('span')[1].innerText,//@ts-ignore
          status
        } //@ts-ignore    
      })
    }

    /**
     * it is necessary to wait for the response of the request for the error to be handled.
     */

    if (result.error === "invalid") { throw new SintaxeException() }

    if (result.error === "connection") { throw new ConnectionException() }

    return result
  }

}

export { RegistrationStatusProvider }
