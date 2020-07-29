import { Command, flags } from "@oclif/command";
import * as fs from "fs";
import TranslationCommandHandler from "../handlers/command";
import SupportedLanguageHandler from "../handlers/supportedLanguages";

export default class TranslatePhp extends Command {
  static description =
    "Translates a PHP file and generates a new file containing the translations";

  static examples = [
    "$ decyphr php en.php -t pt",
    "$ decyphr php en.php --target_lang pt",
    "$ decyphr php en.php -t pt -o translations/",
    "$ decyphr php en.php --target_lang pt --output_dir translations/",
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    // flag to determine the target language
    target_lang: flags.string({
      char: "t",
      description: "Two-character code for the target language",
    }),
    output_dir: flags.string({
      char: "o",
      description: "The dir that you want the new file to be placed in",
    }),
  };

  static args = [{ name: "file" }];

  getOutputLangs() {
    let langList = [];
    if (fs.existsSync("decyphr.config.json")) {
      const config = JSON.parse(
        fs.readFileSync("decyphr.config.json", "utf-8")
      );
      if (config["languages"]) {
        langList = config["languages"];
      }
    }
    return langList;
  }

  async run() {
    const { args, flags } = this.parse(TranslatePhp);
    let languages: any = [];
    const langHandler = new SupportedLanguageHandler();

    if (this.getOutputLangs().length >= 1) {
      languages = this.getOutputLangs();
    } else {
      languages.push(flags.target_lang);
    }

    for (let language of languages) {
      langHandler.searchByCode(language);
    }

    for (let language of languages) {
      const fileTranslation = new TranslationCommandHandler(
        language,
        args.file,
        "php",
        flags.output_dir
      );

      await fileTranslation.processCommand();
    }
  }
}
