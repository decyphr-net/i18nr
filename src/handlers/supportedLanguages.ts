import SupportedLanguageList from "../utils/supportedLanguages";

export default class SupportedLanguageHandler {
  private _checkCodeLength(code: string): void {
    if (code.length !== 2) {
      throw new Error(
        `Language code: ${code} should only contain 2 characters`
      );
    }
  }

  public displaySupportedLanguages(): void {
    for (let lang in SupportedLanguageList) {
      console.info(`${lang} => ${SupportedLanguageList[lang]}`);
    }
  }

  public searchByCode(code: string): void {
    this._checkCodeLength(code);

    if (!(code in SupportedLanguageList)) {
      throw new Error(
        `Could not find ${code}. Try tunning 'supported_languages'`
      );
    } else {
      console.info(`${code} => ${SupportedLanguageList[code]}`);
    }
  }

  public searchByName(name: string): void {
    let found = false;

    for (const [key, value] of Object.entries(SupportedLanguageList)) {
      if (value.toLowerCase() === name) {
        found = true;
        console.info(`${key} => ${value}`);
      }
    }

    if (!found) {
      throw new Error(
        `Could not find ${name}. Try tunning 'supported_languages'`
      );
    }
  }
}
