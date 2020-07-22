import axios from 'axios'

interface ApiData {
  target_language_code: string;
  text: string;
}

export default class APIInterface {
  private _BASEURL: string = 'https://decyphr.uc.r.appspot.com/api/v1/'
  private _endpoint: string = 'text-to-text/'
  private _translationUrl = this._BASEURL + this._endpoint

  async callApi(target_language_code: any, text: any) {
    const data: ApiData = {
      target_language_code: target_language_code,
      text: text,
    }
    return axios.post(this._translationUrl, data)
    .then(response => {return response.data})
    .catch(error => console.error(error))
  }
}