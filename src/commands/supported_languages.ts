import {Command} from '@oclif/command'
import SupportedLanguageList from '../utils/supportedLanguages'

export default class SupportedLanguages extends Command {
  static description = 'Outputs the list of supported languages'

  static examples = [
    '$ decyphr supported_languages'
  ]

  async run() {
    for (let lang in SupportedLanguageList) {
      this.log(`${lang} => ${SupportedLanguageList[lang]}`)
    }
  }
}
