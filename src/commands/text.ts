/**
 * translate-test.ts is a straightforward text-to-text translation. In order
 * to use this command, simple call the command pass the text that you wish to
 * translate as the first parameter and the the target language as a flag
 */
import { Command, flags } from "@oclif/command";
import APIInterface from "../handlers/api";

export default class TranslateText extends Command {
  static description = "Translates string of text";

  static examples = [
    "$ decyphr text hello -t pt",
    "$ decyphr text hello --target_lang pt",
    '$ decyphr text "tudo bem?" --target_lang en',
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    // flag to determine the target language
    target_lang: flags.string({
      char: "t",
      description: "Two-character code for the target language",
    }),
  };

  static args = [{ name: "text" }];

  async run() {
    const { args, flags } = this.parse(TranslateText);
    const apiClient = new APIInterface();
    let data = {
      target_language_code: flags.target_lang,
      text: args.text,
    };
    const response = await apiClient.translateText(data);
    this.log(`"${args.text}" translates to "${response.translated_text}"`);
  }
}
