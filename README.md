<p align="center">
  <img src="assets/i18nr.png" width="350"/>
</p>

<p align="center">
  A command line tool for simplifying the process of translating your application
</p>

<p align="center">
  <a href="https://oclif.io" target="_blank">
    <img src="https://img.shields.io/badge/cli-oclif-brightgreen.svg" />
  </a>
  <a href="https://npmjs.org/package/decyphr" target="_blank">
    <img src="https://img.shields.io/npm/v/decyphr.svg" />
  </a>
  <a href="https://npmjs.org/package/decyphr" target="_blank">
    <img src="https://img.shields.io/npm/dw/decyphr.svg" />
  </a>
  <a href="https://github.com/decyphr-net/cli/blob/master/package.json" target="_blank">
    <img src="https://img.shields.io/npm/l/decyphr.svg" />
  </a>
</p>


- [What is decyphr-i18nr?](#what-is-decyphr-i18nr)
  - [What it is](#what-it-is)
  - [What it isn't](#what-it-isnt)
- [Getting Started](#getting-started)
  - [Commands](#commands)
    - [`translate-file`](#translate-file)
    - [`translate-yaml`](#translate-yaml)
    - [`translate-text`](#translate-text)

# What is decyphr-i18nr?

## What it is

*decyphr-i18nr* is a command line tool built for the purpose of assisting developers with the process of creating translations for their apps.
During the development of some web applications I used Google Translate to help me quickly put together translations of my sites, which involved a lot of manual copying and pasting which was tedious, laborious, time consuming and error prone. As a solution for this, I built a server side component to handle the integration with the Google Translate API and *decyphr-i18nr* to send the text to the API to be translated and from that, generate the translation files for the developer. This has sped up development and reduced the amount of silly mistakes of text been pasted into the wrong files, etc.

Simply specify the JSON file you wish to translate and the language that you which to translate it to and it will generate your translations - including the JSON file for that language.

## What it isn't

*decyphr-i18nr* is **not** a substitute for existing internationalization tools. *decyphr-i18nr* is intended to work with your internationalization tool to provide the translations that will be injected to the site via the internationalization tool.

For example, if you are using React, you may be using *react-intl* or *react-i18next* to implement the overall infrastructure, and separating your site content out into a separate JSON file, then you can use *decyphr-i18nr* to translate the initial language into as many other langauges as you choose.

**decyphr-i18nr requires you to have your one JSON file created for your initial langauage, but it will use this JSON structure to generate new files for any languages that you choose**

*decyphr-i18nr* is **not** 100% accurate. Translations are provided by Google Translate, and therefore *decyphr-i18nr* will only be as accurate as Google Translate. With that being said, it is pretty good, but do expect some things to be not quite right.

*decyphr-i18nr* does **not** support much at the moment. So far we only only support simple JSON files, but are working on being as widely supported as possible.

# Getting Started

*decyphr-i18nr* is currently available on [NPM](https://www.npmjs.com/package/decyphr) and can be installed globally with:

```bash
sudo npm i -g decyphr
```

Once installed, the `decyphr` command will be available.

Or, you can install `decyphr-i18nr` as a dependency in your project with:
```bash
npm i --save-dev decyphr
```

And add it to your npm scripts:

```json
"translate:pt": "./node_modules/.bin/decyphr translate-file i18n/translations/en.json -t pt"
```

This way you can just run translate your projects with an npm command:

```bash
npm run translate:pt
```

## Commands
In addition to the `decyphr help` command, `decyphr` currently comes with three commands.
- `translate-text`
- `translate-file`
- `translate-yaml`

### `translate-file`
`translate-file` will translate a JSON file that you specify and generate the translated file with the language specified.

This takes one required argument of **filename** and one required flag of **-t** or **--target_lang** with one optional parameter of **-o** or **--output_dir** to specify the location of the new translation file.
- `filename` - the name of the file to translate (can include a path)
- `-t`/`--target_lang` - a 2-digit language identifier used to inform what the target language is
- `-o`/`--output_dir` - the path to where you want the file to be output. A filename will be generate, so don't include one. If left blank, the file will be placed the same location as the input directory 

```
USAGE
  $ decyphr translate-file [FILE]

OPTIONS
  -h, --help                     show CLI help
  -o, --output_dir=output_dir    The dir that you want the new file to be placed in
  -t, --target_lang=target_lang  Two-character code for the target language

EXAMPLES
  $ decyphr translate-file en.json -t pt
  $ decyphr translate-file en.json --target_lang pt
  $ decyphr translate-file en.json -t pt -o translations/
  $ decyphr translate-file en.json --target_lang pt --output_dir translations/
```

Translate the en.json file that's in the `translations` folder and output the Portuguese translations to the same folder -
```bash
decyphr translate-file translations/en.json -t pt
# outputs - a new file called `pt.json` in the `translations` directory
```

Or translate the en.json file that's in the `translations` folder and output the Portuguese translations to current directory -
```bash
decyphr translate-file translations/en.json -t pt -o ./
# outputs - a new file called `pt.json` in the current directory
```

The input langauge will be determined based on the content being translated, rather than the name of the file or any other flag.

To see examples of what the output looks like then checkout the `examples` folder. In all cases the source language used was English, and any non-`en.json` files were automatically generated using this command.

### `translate-yaml`
`translate-yaml` will translate a YAML file that you specify and generate the translated file with the language specified.

This takes one required argument of **filename** and one required flag of **-t** or **--target_lang** with one optional parameter of **-o** or **--output_dir** to specify the location of the new translation file.
- `filename` - the name of the file to translate (can include a path)
- `-t`/`--target_lang` - a 2-digit language identifier used to inform what the target language is
- `-o`/`--output_dir` - the path to where you want the file to be output. A filename will be generate, so don't include one. If left blank, the file will be placed the same location as the input directory

```bash
Translates a YAML file and generates a new file containing the translations

USAGE
  $ decyphr translate-yaml [FILE]

OPTIONS
  -h, --help                     show CLI help
  -o, --output_dir=output_dir    The dir that you want the new file to be placed in
  -t, --target_lang=target_lang  Two-character code for the target language

EXAMPLES
  $ decyphr translate-yaml en.yaml -t pt
  $ decyphr translate-yaml en.yaml --target_lang pt
  $ decyphr translate-yaml en.yaml -t pt -o translations/
  $ decyphr translate-yaml en.yaml --target_lang pt --output_dir translations/
```

Translate the en.yaml file that's in the `translations` folder and output the Portuguese translations to the same folder -
```bash
decyphr translate-yaml translations/en.yaml -t pt
# outputs - a new file called `pt.yaml` in the `translations` directory
```

Or translate the en.yaml file that's in the `translations` folder and output the Portuguese translations to current directory -
```bash
decyphr translate-file translations/en.yaml -t pt -o ./
# outputs - a new file called `pt.yaml` in the current directory
```

The input langauge will be determined based on the content being translated, rather than the name of the file or any other flag.

To see examples of what the output looks like then checkout the `examples` folder. In all cases the source language used was English, and any non-`en.yaml` files were automatically generated using this command.

### `translate-text`
`translate-text` is a simple command that will translate a given piece of text and translate it to the target language.

This takes one required argument of **text** and one required flag of **-t** or **--target_lang**.
- `text` - a string of text that you want to translate
- `-t`/`--target_lang` - a 2-digit language identifier used to inform what the target language is

```bash
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

For example, to translate the word **hello** into Portuguese, thenuse -
```bash
decyphr translate-text hello -t pt
# outputs - "hello" translates to "Olá"
```

Longer strings of text can also be used -
```bash
decyphr translate-text "hello, my name is Aaron" -t pt
# outputs - "hello, my name is Aaron" translates to "Olá, meu nome é Aaron"
```

The input language is automatically determined, so you don't need to specify the input language, and you can use any language as input -
```bash
decyphr translate-text "esta frase é portuguesa e será traduzida para o francês" -t fr
# outputs - "esta frase é portuguesa e será traduzida para o francês" translates to "cette phrase est portugaise et sera traduite en français"
```
