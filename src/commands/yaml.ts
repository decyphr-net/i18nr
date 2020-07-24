import {Command, flags} from '@oclif/command'

import TranslationCommandHandler from '../handlers/command'

export default class TranslateYaml extends Command {
  static description = 'Translates a YAML file and generates a new file containing the translations'

  static examples = [
    '$ decyphr yaml en.yaml -t pt',
    '$ decyphr yaml en.yaml --target_lang pt',
    '$ decyphr yaml en.yaml -t pt -o translations/',
    '$ decyphr yaml en.yaml --target_lang pt --output_dir translations/',
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
    const {args, flags} = this.parse(TranslateYaml)

    const fileTranslation = new TranslationCommandHandler(
      flags.target_lang!, args.file, 'yaml', flags.output_dir)
    
    await fileTranslation.processCommand()
  }
}
