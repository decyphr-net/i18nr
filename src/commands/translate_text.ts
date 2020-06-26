import {Command, flags} from '@oclif/command'

export default class TranslateText extends Command {
  static description = 'Translates string of text'

  static examples = [
    `$ decyphr translate_text
hello world from ./src/translate_text.ts!
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag to determine the language of the text provided
    existing_lang: flags.string({char: 'l', description: 'Four-character code for the target language'}),
    // flag to determine the target language
    target_lang: flags.string({char: 't', description: 'Two-character code for the target language'})
  }

  static args = [{name: 'text'}]

  async run() {
    const {args, flags} = this.parse(TranslateText)

    this.log(`You are trying to translate "${args.text}" from "${flags.existing_lang}" to "${flags.target_lang}"`)
  }
}
