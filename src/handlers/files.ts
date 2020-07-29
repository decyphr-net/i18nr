import * as fs from "fs";
import * as util from "util";
import * as YAML from "yamljs";
import * as PrettyYaml from "json-to-pretty-yaml";
import laravel2js from "laravelphp";

export default class FileHandler {
  private _inputpath: string;
  public outputpath: string;
  private _outputfilename: string;
  private _type: string;
  private _filename: string;

  public inputContents: any;
  public outputContents: any;
  readFile = util.promisify(fs.readFile);

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
  constructor(
    filename: string,
    type: string,
    outputfilename: string,
    outputpath?: string
  ) {
    this._filename = filename;
    this._inputpath = filename.substr(0, filename.lastIndexOf("/")) + "/";
    this._outputfilename = outputfilename;
    this.outputpath = outputpath || this._inputpath;
    this._type = type;

    console.info(`file will be output to: ${this._constructOutputPath()}...`);
  }

  /**
   * Concatenates the output path and file nformation to construct the full
   * path that will be used to deteremine the final write location.
   *
   * @returns The ouput location including the filename and extenstion
   */
  private _constructOutputPath(): string {
    return this.outputpath + this._outputfilename + "." + this._type;
  }

  /**
   * Read the contents of the file that the user wants to translate and return
   * the contents as JSON
   */
  async readTranslationFile(location: any) {
    if (this._type === "json" || this._type == "php") {
      return this.readFile(location, "utf8");
    } else if (this._type === "yaml") {
      return YAML.load(location);
    }

    console.info(`contents of ${location} read successfully...`);
    return this.inputContents;
  }

  /**
   * Writes the translated contents to the file specified by the user
   *
   * @param contents The translated text in JSON format
   */
  async outputFile(data: any) {
    let outputTo = await this._constructOutputPath();
    console.info(`writing file contents to ${outputTo}`);
    if (this._type === "json") {
      fs.writeFile(outputTo, JSON.stringify(data, null, 2), (err) => {
        if (err) console.error(err);
        console.log("task complete...");
      });
    } else if (this._type === "yaml") {
      fs.writeFile(outputTo, PrettyYaml.stringify(data, 2), (err) => {
        if (err) console.error(err);
        console.log("task complete...");
      });
    } else if (this._type === "php") {
      data = await laravel2js.js2laravel(data);
      fs.writeFile(outputTo, data, (err) => {
        if (err) console.error(err);
        console.log("task complete...");
      });
    }
  }
}
