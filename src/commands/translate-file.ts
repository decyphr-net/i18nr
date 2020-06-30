/**
 * translate-test.ts is a straightforward text-to-text translation. In order
 * to use this command, simple call the command pass the text that you wish to
 * translate as the first parameter and the the target language as a flag
 */
import {Command, flags} from '@oclif/command'
import { readFileSync } from 'fs';

export default class TranslateFile extends Command {
  static description = 'Translates a generates a new file containing the tranlsations'

  static examples = [
    '$ decyphr translate-file en.json -t pt',
    '$ decyphr translate-file en.json --target_lang pt',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag to determine the target language
    target_lang: flags.string({char: 't', description: 'Two-character code for the target language'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(TranslateFile);
    let file = JSON.parse(readFileSync(args.file, 'utf8'));
    this.log(`${args.file} - ${flags.target_lang}`);
  }
}
