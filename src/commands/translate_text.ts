import {Command, flags} from '@oclif/command'
import axios from 'axios'

interface ApiData {
  initial_language_code: string,
  target_language_code: string,
  text: string
}

export default class TranslateText extends Command {
  static description = 'Translates string of text'

  static examples = [
    `$ decyphr translate_text hello -l en-US -t pt`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag to determine the language of the text provided
    existing_lang: flags.string({char: 'l', description: 'Four-character code for the target language'}),
    // flag to determine the target language
    target_lang: flags.string({char: 't', description: 'Two-character code for the target language'})
  }

  static args = [{name: 'text'}]

  async callApi(initial_language_code:any, target_language_code:any, text:any) {
    let data: ApiData = {
      "initial_language_code": initial_language_code,
      "target_language_code": target_language_code,
      "text": text
    }
    return axios.post('https://decyphr.uc.r.appspot.com/api/v1/plain-text/', data)
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  async run() {
    const {args, flags} = this.parse(TranslateText)
    let response = this.callApi(flags.existing_lang, flags.target_lang, args.text)
    this.log(`You are trying to translate "${args.text}" from "${flags.existing_lang}" to "${flags.target_lang}"`)
  }
}
