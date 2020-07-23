import APIInterface from './api'

export default class Translator {
  private _client: APIInterface
  public targetLang: string

  constructor(targetLang: string) {
    this._client = new APIInterface()
    this.targetLang = targetLang
  }

  public async translateText(textToTranslate: string) {
    const response = await this._client.callApi(
      this.targetLang, textToTranslate)
    return response.translated_text
  }
}