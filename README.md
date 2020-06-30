decyphr-cli
===========

The command line tool for integrating with decyphr services

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/decyphr.svg)](https://npmjs.org/package/decyphr)
[![Downloads/week](https://img.shields.io/npm/dw/decyphr.svg)](https://npmjs.org/package/decyphr)
[![License](https://img.shields.io/npm/l/decyphr.svg)](https://github.com/decyphr-net/cli/blob/master/package.json)

<!-- toc -->
* [What is it](#what-is-it)
* [Usage](#usage)
* [Commands](#commands)

# What Is It
This is the command line tool that will be used to with decyphr translation API.

As a sole developer that doesn't speak other languages fluently, I often rely on on Google Translate to assist with translating sites and the process of getting each piece of text and translating it and placing it into the project in a format that can be worked with is a time-consuming a tedious process.

This tool aims to make this process easier for developers to add i18n to their projects.
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g decyphr
$ decyphr COMMAND
running command...
$ decyphr (-v|--version|version)
decyphr/0.0.1 linux-x64 node-v10.19.0
$ decyphr --help [COMMAND]
USAGE
  $ decyphr COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`decyphr translate-text [TEXT]`](#decyphr-translate-text-text)
* [`decyphr help [COMMAND]`](#decyphr-help-command)

## `decyphr translate-text [TEXT]`

describe the command here

```
USAGE
  $ decyphr translate-text [TEXT]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -t, --target_lang=lang_code  2 digit language code for the target language

EXAMPLE
  $ decyphr translate-text "tudo bem?" --target_lang en
  Response retrieved successfully
  "tudo bem?" translates to "all well?"
```

_See code: [src/commands/translate-text.ts](https://github.com/decyphr-net/cli/blob/v0.0.1/src/commands/translate-text.ts)_

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
<!-- commandsstop -->
