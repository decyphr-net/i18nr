/**
 * translate-test.ts is a straightforward text-to-text translation. In order
 * to use this command, simple call the command pass the text that you wish to
 * translate as the first parameter and the the target language as a flag
 */
import {Command, flags} from '@oclif/command'
import APIInterface from '../handlers/api'

export default class TranslateText extends Command {
  static description = 'Translates string of text'

  static examples = [
    '$ decyphr translate-text hello -t pt',
    '$ decyphr translate-text hello --target_lang pt',
    '$ decyphr translate-text "tudo bem?" --target_lang en',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag to determine the target language
    target_lang: flags.string({char: 't', description: 'Two-character code for the target language'}),
  }

  static args = [{name: 'text'}]

  async run() {
    const {args, flags} = this.parse(TranslateText)
    const apiClient = new APIInterface()
    const response = await apiClient.callApi(flags.target_lang, args.text)
    this.log(`"${args.text}" translates to "${response.translated_text}"`)
  }
}
