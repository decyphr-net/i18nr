import {Command, flags} from '@oclif/command'
import axios from 'axios'

interface ApiData {
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
    // flag to determine the target language
    target_lang: flags.string({char: 't', description: 'Two-character code for the target language'})
  }

  static args = [{name: 'text'}]

  async callApi(target_language_code:any, text:any) {
    let data: ApiData = {
      "target_language_code": target_language_code,
      "text": text
    }
    return axios.post('https://decyphr.uc.r.appspot.com/api/v1/text-to-text/', data)
      .then(response => {
        console.log("Response retrieved successfully")
        return response.data
      })
      .catch(error => console.log(error))
  }

  async run() {
    const {args, flags} = this.parse(TranslateText)
    let response = await this.callApi(flags.target_lang, args.text)
    this.log(`"${args.text}" translates to "${response.translated_text}"`)
  }
}
