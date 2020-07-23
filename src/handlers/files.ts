import {readFileSync, writeFileSync, existsSync, mkdirSync} from 'fs'
import Translator from './translator'

export default class FileHandler {
  private _inputpath: string
  private _outputpath: string
  private _outputfilename: string
  private _type: string
  private _filename: string
  private _translator: Translator
  public parsedContents: any

  /**
   * Constructs the `FileHandler` object using the parameters provided by the
   * user.
   * 
   * @remarks
   * If the output is not specified, it will use the current directory and for
   * now will assume that the output file type will be JSON.
   * 
   * Will create the output directory if it doesn't exist.
   * 
   * @param filename - The name of the file that the user wants to translate
   * @param outputfilename - The name that will be given to the new file
   * @param outputpath - The directory where the new file will be created 
   */
  constructor(filename: string, outputfilename: string, outputpath?: string) {
    this._filename = filename
    this._inputpath = filename.substr(0, filename.lastIndexOf('/')) + '/'
    this._outputfilename = outputfilename
    this._outputpath = outputpath || this._inputpath
    this._type = this._filename.substring(this._filename.lastIndexOf('.'))
    this._translator = new Translator(this._outputfilename)

    this._outputLocationExists()
    
    console.info(`file will be output to: ${this._constructOutputPath()}...`)
  }

  /**
   * Will determine whether or not the location that the user wishes to create
   * newly created translation file exists.
   * 
   * If the directory does not exist then it will call the `_createOutputDir`
   * to ensure that the directory will exist when the command needs it.
   */
  private _outputLocationExists() {
    if (!existsSync(this._outputpath)) {
      console.info(`${this._outputpath} does not exist. Creating now...`)
      this._createOutputDir()
    }
  }

  /**
   * Create a new directory on the with the path specified by the user.
   * 
   * This method is usually only called when the path specified by a user
   * doesn't exist on the file system.
   */
  private _createOutputDir() {
    mkdirSync(this._outputpath)
    console.info(`${this._outputpath} created successfully...`)
  }

  /**
   * Concatenates the output path and file nformation to construct the full
   * path that will be used to deteremine the final write location.
   * 
   * @returns The ouput location including the filename and extenstion
   */
  private _constructOutputPath(): string {
    return this._outputpath + this._outputfilename + this._type
  }

  /**
   * Read the contents of the file that the user wants to translate and return
   * the contents as JSON
   */
  async readFile() {
    let file = readFileSync(this._filename, 'utf-8')
    console.info(`contents of ${this._filename} read successfully...`)
    this.parsedContents = JSON.parse(file)
    return this.parsedContents
  }

  /**
   * Writes the translated contents to the file specified by the user
   * 
   * @param contents The translated text in JSON format
   */
  async outputFile(contents: any) {
    let outputTo = await this._constructOutputPath()
    console.info(`writing file contents to ${outputTo}`)
    writeFileSync(outputTo, JSON.stringify(contents, null, 2));
  }

  /**
   * Traverse over the items in the object and if the key doesn't have any
   * children, then translate the text, otherwise pass the child object to
   * this method
   * 
   * TODO: Move this function a separate parser handler
   * 
   * @param {object} contents - The nested object structure to be traversed
   */
  async parseContents(contents: any) {
    for (const [key, value] of Object.entries(contents)) {
      if (typeof value !== 'object') {
        contents[key] = await this._translator.translateText(contents[key])
      } else {
        this.parseContents(value)
      }
    }
  }
}