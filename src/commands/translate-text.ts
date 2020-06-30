/**
 * translate-test.ts is a straightforward text-to-text translation. In order
 * to use this command, simple call the command pass the text that you wish to
 * translate as the first parameter and the the target language as a flag
 */
import {Command, flags} from '@oclif/command'
import axios from 'axios'

interface ApiData {
  target_language_code: string;
  text: string;
}

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

  async callApi(target_language_code: any, text: any) {
    const data: ApiData = {
      target_language_code: target_language_code,
      text: text,
    }
    return axios.post('https://decyphr.uc.r.appspot.com/api/v1/text-to-text/', data)
    .then(response => {
      this.log('Response retrieved successfully')
      return response.data
    })
    .catch(error => this.log(error))
  }

  async run() {
    const {args, flags} = this.parse(TranslateText)
    const response = await this.callApi(flags.target_lang, args.text)
    this.log(`"${args.text}" translates to "${response.translated_text}"`)
  }
}