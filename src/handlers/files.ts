import * as fs from "fs";
import * as util from "util";
import * as YAML from "yamljs";
import * as PrettyYaml from "json-to-pretty-yaml";
import Translator from "./translator";

export default class FileHandler {
  private _inputpath: string;
  private _outputpath: string;
  private _outputfilename: string;
  private _type: string;
  private _filename: string;
  private _translator: Translator;
  public parsedContents: any;
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
    this._outputpath = outputpath || this._inputpath;
    this._type = type;
    this._translator = new Translator(this._outputfilename);

    console.info(`file will be output to: ${this._constructOutputPath()}...`);
  }

  /**
   * Concatenates the output path and file nformation to construct the full
   * path that will be used to deteremine the final write location.
   *
   * @returns The ouput location including the filename and extenstion
   */
  private _constructOutputPath(): string {
    return this._outputpath + this._outputfilename + "." + this._type;
  }

  /**
   * Read the contents of the file that the user wants to translate and return
   * the contents as JSON
   */
  async readTranslationFile() {
    if (this._type === "json") {
      return this.readFile(this._filename, "utf8");
    } else if (this._type === "yaml") {
      this.parsedContents = YAML.load(this._filename);
    }

    console.info(`contents of ${this._filename} read successfully...`);
    return this.parsedContents;
  }

  /**
   * Writes the translated contents to the file specified by the user
   *
   * @param contents The translated text in JSON format
   */
  async outputFile() {
    let outputTo = await this._constructOutputPath();
    console.info(`writing file contents to ${outputTo}`);
    if (this._type === "json") {
      fs.writeFile(
        outputTo,
        JSON.stringify(this.parsedContents, null, 2),
        (err) => {
          if (err) console.error(err);
          console.log("task complete...");
        }
      );
    } else if (this._type === "yaml") {
      fs.writeFile(
        outputTo,
        PrettyYaml.stringify(this.parsedContents, 2),
        (err) => {
          if (err) console.error(err);
          console.log("task complete...");
        }
      );
    }
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
      if (typeof value !== "object") {
        contents[key] = await this._translator.translateText(contents[key]);
      } else {
        this.parseContents(value);
      }
    }
  }
}
