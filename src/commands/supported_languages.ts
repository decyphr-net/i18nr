import {Command} from '@oclif/command'
import SupportedLanguagesHandler from '../handlers/supportedLanguages'

export default class SupportedLanguages extends Command {
  static description = 'Outputs the list of supported languages'

  static examples = [
    '$ decyphr supported_languages'
  ]

  async run() {
    const langHandler = new SupportedLanguagesHandler()
    langHandler.displaySupportedLanguages()
  }
}
