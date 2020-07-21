decyphr-cli
===========

The command line tool for integrating with decyphr services

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/decyphr.svg)](https://npmjs.org/package/decyphr)
[![Downloads/week](https://img.shields.io/npm/dw/decyphr.svg)](https://npmjs.org/package/decyphr)
[![License](https://img.shields.io/npm/l/decyphr.svg)](https://github.com/decyphr-net/cli/blob/master/package.json)

<!-- toc -->
* [What Is It](#what-is-it)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g decyphr
$ decyphr COMMAND
running command...
$ decyphr (-v|--version|version)
decyphr/0.1.0 linux-x64 node-v12.18.2
$ decyphr --help [COMMAND]
USAGE
  $ decyphr COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`decyphr help [COMMAND]`](#decyphr-help-command)
* [`decyphr translate-file [FILE]`](#decyphr-translate-file-file)
* [`decyphr translate-text [TEXT]`](#decyphr-translate-text-text)

## `decyphr help [COMMAND]`

display help for decyphr

```
USAGE
  $ decyphr help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src/commands/help.ts)_

## `decyphr translate-file [FILE]`

Translates a JSON file and generates a new file containing the translations

```
USAGE
  $ decyphr translate-file [FILE]

OPTIONS
  -h, --help                     show CLI help
  -o, --output_dir=output_dir    The dir that you want the new new file to be placed in
  -t, --target_lang=target_lang  Two-character code for the target language

EXAMPLES
  $ decyphr translate-file en.json -t pt
  $ decyphr translate-file en.json --target_lang pt
  $ decyphr translate-file en.json -t pt -o translations/
  $ decyphr translate-file en.json --target_lang pt --output_dir translations/
```

_See code: [src/commands/translate-file.ts](https://github.com/decyphr-net/cli/blob/v0.1.0/src/commands/translate-file.ts)_

## `decyphr translate-text [TEXT]`

Translates string of text

```
USAGE
  $ decyphr translate-text [TEXT]

OPTIONS
  -h, --help                     show CLI help
  -t, --target_lang=target_lang  Two-character code for the target language

EXAMPLES
  $ decyphr translate-text hello -t pt
  $ decyphr translate-text hello --target_lang pt
  $ decyphr translate-text "tudo bem?" --target_lang en
```

_See code: [src/commands/translate-text.ts](https://github.com/decyphr-net/cli/blob/v0.1.0/src/commands/translate-text.ts)_
<!-- commandsstop -->
