import axios from "axios";

export default class APIInterface {
  private _BASEURL: string = "https://i18nr.herokuapp.com/api/v1/";
  private _endpoint: string = "translate/";
  private _translationUrl = this._BASEURL + this._endpoint;

  async callApi(data: any) {
    return axios
      .post(this._translationUrl, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data["message"];
      });
  }
}
