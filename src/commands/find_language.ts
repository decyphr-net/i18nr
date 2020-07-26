import {Command, flags} from '@oclif/command'
import SupportedLanguagesHandler from '../handlers/supportedLanguages'

export default class FindLanguage extends Command {
  static description = 'Search for a language based on the code or name'

  static examples = [
    '$ decyphr find_language -n Portuguese',
    '$ decyphr find_language -c pt'
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag to determine the target language
    code: flags.string(
      {
        char: 'c',
        description: 'Two-character code for the target language',
      },
    ),
    name: flags.string(
      {
        char: 'n',
        description: 'The name of the langauge you want to check',
      }
    ),
  }

  async run() {
    const {args, flags} = this.parse(FindLanguage)
    const langHandler = new SupportedLanguagesHandler()

    if (flags.code) {
      langHandler.searchByCode(flags.code.toLowerCase())
    } else if (flags.name) {
      langHandler.searchByName(flags.name.toLowerCase())
    }
  }
}
