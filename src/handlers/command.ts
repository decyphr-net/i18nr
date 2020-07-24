import * as fs from 'fs'

import FileHandler from './files'

export default class TranslationCommandHandler {

  private _userConfig: any
  private _fileHandler: FileHandler
  private _inputFilename: string
  private inputPath: string
  private _outputPath: string
  private _fileType: string
  private _target_lang: string

  constructor(
    targetLang: string,
    inputFilename: string,
    fileType: string,
    outputDir?: string
  ) {
    this._target_lang = targetLang
    this._inputFilename = inputFilename
    this._outputPath = outputDir || ''
  
    if (fs.existsSync('decyphr.config.json')) {
      this._userConfig = JSON.parse(fs.readFileSync('decyphr.config.json', 'utf-8'))
      this.inputPath = `${this._userConfig['translationDir']}${inputFilename}`
      this._outputPath = this._userConfig['translationDir'] + this._outputPath
    } else {
      console.warn('config not found')
      this.inputPath = inputFilename
    }

    this._fileType = fileType
    this._fileHandler = new FileHandler(
      this.inputPath, this._fileType, this._target_lang!, this._outputPath)
  }

  private _write(cb: any) {
    this._fileHandler.outputFile()
    cb()
  }

  public async processCommand() {
    let content = await this._fileHandler.readFile()
    await this._fileHandler.parseContents(content)
    setTimeout(() => {
      this._write(() => console.log('task complete'))
    }, 10000)
  }
}
