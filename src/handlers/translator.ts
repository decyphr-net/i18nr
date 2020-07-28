import APIInterface from "./api";

export default class Translator {
  private _client: APIInterface;

  constructor() {
    this._client = new APIInterface();
  }

  public async translateText(data: any) {
    const response = await this._client.callApi(data);
    return response;
  }
}
