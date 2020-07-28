import * as fs from "fs";
import Translator from "./translator";
import FileHandler from "./files";
import { ServerResponse } from "http";

export default class TranslationCommandHandler {
  private _userConfig: any;
  private _fileHandler: FileHandler;
  private _inputFilename: string;
  private inputPath: string;
  private _outputPath: string;
  private _fileType: string;
  private _target_lang: string;
  private _translator: Translator;

  constructor(
    targetLang: string,
    inputFilename: string,
    fileType: string,
    outputDir?: string
  ) {
    this._target_lang = targetLang;
    this._inputFilename = inputFilename;
    this._outputPath = outputDir || "";
    this._translator = new Translator();

    if (fs.existsSync("decyphr.config.json")) {
      this._userConfig = JSON.parse(
        fs.readFileSync("decyphr.config.json", "utf-8")
      );
      this.inputPath = `${this._userConfig["translationDir"]}${inputFilename}`;
      this._outputPath = this._userConfig["translationDir"] + this._outputPath;
    } else {
      console.warn("config not found");
      this.inputPath = inputFilename;
    }

    this._fileType = fileType;
    this._fileHandler = new FileHandler(
      this.inputPath,
      this._fileType,
      this._target_lang!,
      this._outputPath
    );
  }

  public async processCommand() {
    console.log(this.inputPath, this._outputPath);
    let outputLocation =
      this._fileHandler.outputpath + this._target_lang + "." + this._fileType;
    this._fileHandler.inputContents = await this._fileHandler.readTranslationFile(
      this.inputPath
    );
    try {
      this._fileHandler.outputContents = await this._fileHandler.readTranslationFile(
        outputLocation
      );
    } catch (err) {
      if (this._fileType === "json") {
        this._fileHandler.outputContents = JSON.stringify({});
      } else {
        this._fileHandler.outputContents = {};
      }
    }

    let data = {};

    if (this._fileType === "json") {
      data = {
        language_code: this._target_lang,
        original_text: JSON.parse(this._fileHandler.inputContents),
        translated_text: JSON.parse(this._fileHandler.outputContents),
      };
    } else {
      data = {
        language_code: this._target_lang,
        original_text: this._fileHandler.inputContents,
        translated_text: this._fileHandler.outputContents,
      };
    }

    let response = await this._translator.translateText(data);

    if (response !== "Files seem to be update to date") {
      this._fileHandler.outputFile(response);
    } else {
      console.log(response);
    }
  }
}
