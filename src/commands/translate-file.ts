/**
 * translate-test.ts is a straightforward text-to-text translation. In order
 * to use this command, simple call the command pass the text that you wish to
 * translate as the first parameter and the the target language as a flag
 */
import {Command, flags} from '@oclif/command'
import axios from 'axios'
import FileHandler from '../handlers/files'

interface ApiData {
  target_language_code: string;
  text: string;
}

export default class TranslateFile extends Command {
  static description = 'Translates a JSON file and generates a new file containing the translations'

  static examples = [
    '$ decyphr translate-file en.json -t pt',
    '$ decyphr translate-file en.json --target_lang pt',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag to determine the target language
    targetLang: flags.string(
      {
        char: 't',
        description: 'Two-character code for the target language'
      },
    ),
    outputDir: flags.string(
      {
        char: 'o',
        description: 'The dir that you want the new new file to be placed in'
      }
    )
  }

  static args = [{name: 'file'}]

  async callApi(target_language_code: any, text: any) {
    const data: ApiData = {
      target_language_code: target_language_code,
      text: text,
    }
    return axios.post(
      'https://decyphr.uc.r.appspot.com/api/v1/text-to-text/', data)
    .then(response => {
      return response.data
    })
    .catch(error => this.log(error))
  }

  async parseContents(fileContents: any, target_lang: any) {
    let translationContents: any = {}

    console.info(`translating contents now...`)
    for (const property in fileContents) {
      let response = await this.callApi(target_lang, fileContents[property])
      translationContents[property] = response.translated_text;
    }

    return translationContents;
  }

  async run() {
    const {args, flags} = this.parse(TranslateFile);
    let fileHandler = new FileHandler(args.file, flags.targetLang!, flags.outputDir || '');
    let fileContents = await fileHandler.readFile()
    let contents = await this.parseContents(fileContents, flags.targetLang)
    await fileHandler.outputFile(contents)
    this.log(`task complete`);
  }
}
