/**
 * translate-test.ts is a straightforward text-to-text translation. In order
 * to use this command, simple call the command pass the text that you wish to
 * translate as the first parameter and the the target language as a flag
 */
import {Command, flags} from '@oclif/command'
import TranslationCommandHandler from '../handlers/command'

export default class TranslateJson extends Command {
  static description = 'Translates a JSON file and generates a new file containing the translations'

  static examples = [
    '$ decyphr json en.json -t pt',
    '$ decyphr json en.json --target_lang pt',
    '$ decyphr json en.json -t pt -o translations/',
    '$ decyphr json en.json --target_lang pt --output_dir translations/',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag to determine the target language
    target_lang: flags.string(
      {
        char: 't',
        description: 'Two-character code for the target language',
      },
    ),
    output_dir: flags.string(
      {
        char: 'o',
        description: 'The dir that you want the new file to be placed in',
      }
    ),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(TranslateJson)

    const fileTranslation = new TranslationCommandHandler(
      flags.target_lang!, args.file, 'json', flags.output_dir)
    
    await fileTranslation.processCommand()
  }
}
