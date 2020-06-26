import {Command, flags} from '@oclif/command'

class Decyphr extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    text: flags.string({char: 't', description: 'Text that you wish to translate'}),
    new_language_code: flags.string({char: 'l', description: 'Language code of the target language (2-chars)'}),
    language_code: flags.string({char: 'c', description: 'Language code of the target language (4-chars)'})
  }

  static args = [{name: 'text'}]

  async run() {
    const {args, flags} = this.parse(Decyphr)

    const text = flags.text;
    const new_lang = flags.new_language_code;
    const lang_code = flags.language_code
    this.log(`So, you want to translate "${text}" from "${lang_code}" to "${new_lang}"`);
  }
}

export = Decyphr
