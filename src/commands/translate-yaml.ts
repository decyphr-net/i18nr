import {Command, flags} from '@oclif/command'
import * as YAML from 'yamljs'
import * as PrettyYaml from 'json-to-pretty-yaml'
import FileHandler from '../handlers/files'

export default class TranslateYaml extends Command {
  static description = 'Translates a YAML file and generates a new file containing the translations'

  static examples = [
    '$ decyphr translate-yaml en.yaml -t pt',
    '$ decyphr translate-yaml en.yaml --target_lang pt',
    '$ decyphr translate-yaml en.yaml -t pt -o translations/',
    '$ decyphr translate-yaml en.yaml --target_lang pt --output_dir translations/',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag to determine the target language
    target_lang: flags.string(
      {
        char: 't',
        description: 'Two-character code for the target language',
      },
    ),
    output_dir: flags.string(
      {
        char: 'o',
        description: 'The dir that you want the new file to be placed in',
      }
    ),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(TranslateYaml)
    const fileHandler = new FileHandler(args.file, flags.target_lang!, flags.output_dir || '')
    let content = await YAML.load(args.file)
    fileHandler.parsedContents = content
    await fileHandler.parseContents(content)
    setTimeout(() => {
      console.log(fileHandler.parsedContents)
      fileHandler.outputFile(PrettyYaml.stringify(fileHandler.parsedContents, 2))
      this.log('task complete')
    }, 10000)
  }
}
