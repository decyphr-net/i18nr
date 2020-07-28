import axios from "axios";

export default class APIInterface {
  private _BASEURL: string = "https://i18nr.herokuapp.com/api/v1/";
  private _endpoint: string = "translate/";
  private _translationUrl = this._BASEURL + this._endpoint;

  private _BASETEXTURL: string = "https://decyphr.uc.r.appspot.com/api/v1/";
  private _textEndpoint: string = "text-to-text/";
  private _textTranslationUrl = this._BASETEXTURL + this._textEndpoint;

  async callApi(data: any) {
    return axios
      .post(this._translationUrl, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error.response.data["message"];
      });
  }

  async translateText(data: any) {
    return axios
      .post(this._textTranslationUrl, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.error(error));
  }
}
