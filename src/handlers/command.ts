import * as fs from "fs";

import FileHandler from "./files";

export default class TranslationCommandHandler {
  private _userConfig: any;
  private _fileHandler: FileHandler;
  private _inputFilename: string;
  private inputPath: string;
  private _outputPath: string;
  private _fileType: string;
  private _target_lang: string;

  constructor(
    targetLang: string,
    inputFilename: string,
    fileType: string,
    outputDir?: string
  ) {
    this._target_lang = targetLang;
    this._inputFilename = inputFilename;
    this._outputPath = outputDir || "";

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

  private _write() {
    this._fileHandler.outputFile();
  }

  public async processCommand() {
    let readPromise = this._fileHandler.readTranslationFile();
    readPromise
      .then(async (data) => {
        this._fileHandler.parsedContents = JSON.parse(data);
        await this._fileHandler.parseContents(this._fileHandler.parsedContents);
      })
      .catch((error) => console.error(error));

    setTimeout(() => {
      this._write();
    }, 10000);
  }
}
