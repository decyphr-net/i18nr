<p align="center">
  <img src="assets/i18nr.png" width="350"/>
</p>

<p align="center">
  Perform actual translations on your site
</p>

<p align="center">
  <a href="https://npmjs.org/package/decyphr" target="_blank">
    <img src="https://img.shields.io/npm/v/decyphr.svg?style=for-the-badge" />
  </a>
  <a href="https://github.com/decyphr-net/i18nr">
    <img src="https://img.shields.io/github/commit-activity/w/decyphr-net/i18nr?style=for-the-badge" />
  </a>
  <a href="https://npmjs.org/package/decyphr" target="_blank">
    <img src="https://img.shields.io/npm/dw/decyphr.svg?style=for-the-badge" />
  </a>
  <a href="https://npmjs.org/package/decyphr" target="_blank">
    <img src="https://img.shields.io/npm/dm/decyphr.svg?style=for-the-badge" />
  </a>
  <a href="https://github.com/decyphr-net/cli/blob/master/package.json" target="_blank">
    <img src="https://img.shields.io/npm/l/decyphr.svg?style=for-the-badge" />
  </a>
  <a href="https://oclif.io" target="_blank">
    <img src="https://img.shields.io/badge/cli-oclif-brightgreen.svg?style=for-the-badge" />
  </a>
</p>

# decyphr-i18nr

- [decyphr-i18nr](#decyphr-i18nr)
  - [What is decyphr-i18nr?](#what-is-decyphr-i18nr)
    - [What it is](#what-it-is)
    - [What it isn't](#what-it-isnt)
    - [Supported Formats](#supported-formats)
  - [Getting Started](#getting-started)
    - [Installing for command-line usage](#installing-for-command-line-usage)
    - [Installing as a project dependency](#installing-as-a-project-dependency)
  - [Configuration File](#configuration-file)
    - [Supported settings](#supported-settings)
      - [`translationDir`](#translationdir)
      - [`languages`](#languages)
    - [Commands](#commands)
      - [`json`](#json)
      - [`yaml`](#yaml)
      - [`php`](#php)
      - [`text`](#text)
      - [`supported_languages`](#supported_languages)
      - [`find_language`](#find_language)
  - [Contributions](#contributions)
  - [Issues](#issues)

## What is decyphr-i18nr?

### What it is

Unlike a lot of i18n tools that use the word "translate" in their name, _decyphr-i18nr_ actually translates the text in your application to one or more languages. So long as you have your i18n and source language in place, _deycphr-i18nr_ can take care of the rest of your process, allowing you to continue implementating your functionality, without needing to put your text through a translator tool. During the development of some web applications I used Google Translate to help me quickly put together translations of my sites, which involved a lot of manual copying and pasting which was tedious, laborious, time consuming and error prone. As a solution for this, I built a server side component to handle the integration with the Google Translate API and _decyphr-i18nr_ to send the text to the API to be translated and from that, generate the translation files for the developer. This has sped up development and reduced the amount of silly mistakes of text been pasted into the wrong files, etc.

Simply specify the JSON, YAML or PHP file you wish to translate and the language that you which to translate and it will generate your translations. _decyphr-i18nr_ knows that it's not perfect so if you need to fix any of the content that it translated, you can simply update the specific item that's incorrect, and _decyphr-i18nr_ will leave existing translations as they are, so you can rest assured that if you did need to fix some text, then _decyphr-i18nr_ won't re-translate any text, or override any of the changes that you've made.

### What it isn't

_decyphr-i18nr_ is **not** a substitute for existing internationalization tools. _decyphr-i18nr_ is intended to work with your internationalization tool to provide the translations that will be injected to the site via the internationalization tool.

For example, if you are using React, you may be using _react-intl_ or _react-i18next_ to implement the overall infrastructure, and separating your site content out into a separate JSON file, then you can use _decyphr-i18nr_ to translate the initial language into as many other langauges as you choose.

**decyphr-i18nr requires you to have your one JSON file created for your initial langauage, but it will use this JSON structure to generate new files for any languages that you choose**

_decyphr-i18nr_ is **not** 100% accurate. Translations are provided by Google Translate, and therefore _decyphr-i18nr_ will only be as accurate as Google Translate. With that being said, it is pretty good, but do expect some things to be not quite right.

### Supported Formats

_decyphr-i18nr_ does **not** support much at the moment. So far we support JSON files and YAML files of any depth, but are working on being as widely supported as possible.

_decyphr-i18nr_ does now support the translation of PHP files that are commonly used within the PHP ecosystem, with frameworks like Laravel, however once translated, the order of the array is not honoured. This is a known bug.

Take a look at the examples directory to see some of the structures that `decyphr-i18nr` can work with.

## Getting Started

### Installing for command-line usage

_decyphr-i18nr_ is currently available on [NPM](https://www.npmjs.com/package/decyphr) and can be installed globally with:

```bash
sudo npm i -g decyphr
```

Once installed, the `decyphr` command will be available.

### Installing as a project dependency

Or, you can install `decyphr-i18nr` as a dependency in your project with:

```bash
npm i --save-dev decyphr
```

And add it to your npm scripts:

```json
"translate:pt": "./node_modules/.bin/decyphr json i18n/translations/en.json -t pt"
```

This way you can just run translate your projects with an npm command:

```bash
npm run translate:pt
```

## Configuration File

`decyphr-i18nr` also supports JSON configuration files. Currently `decyphr` will look in the directory that the command is being called from.

### Supported settings

`decyphr-i18nr` currently supports two settings in the configuration file:

- `translationDir`
- `languages`

#### `translationDir`

The directory where your translations are housed. If you have this setting configured, `decyphr` will also look in that directory for the input file, and always output that directory.

```json
{
  "translationDir": "i18n/translations/"
}
```

Place this config in the directory that you run the `decyphr` command from and you'll only need to specify the name of the file:

```bash
decyphr json en.json -t pt
```

Will retrieve the file from `i18n/translations/en.json` and output to `i18n/translations/pt.json`.

Similarly:

```bash
decyphr json loginpage/en.json -t pt -o loginpage/
```

Will retrieve the file from `i18n/translations/loginpage/en.json` and output to `i18n/translations/loginpage/pt.json`

This can also be used in the above NPM example:

```json
"translate:pt": "./node_module/.bin/decyphr json en.json -t pt
```

#### `languages`

An array of 2-digit language code strings. If you specify `languages` in your settings, you will be able to translate the input file to multiple langauges at once without needing to provide a target language.

```json
{
  "translationDir": "i18n/translations/",
  "languages": ["pt", "es", "fr", "ga", "it", "zt"]
}
```

Then when running:

```bash
decyphr json en.json
```

a translation will be created for each language specified in the languages array.

This works in the same way within a Node project:

```json
"translate": "./node_module/.bin/decyphr json en.json
```

Then you'll only need to run:

```bash
npm run translate
```

### Commands

In addition to the `decyphr help` command, `decyphr` currently comes with the following commands.

- `text`
- `json`
- `yaml`
- `supported_languages`
- `find_language`

#### `json`

`json` will translate a JSON file that you specify and generate the translated file with the language specified.

This takes one required argument of **filename** and one required flag of **-t** or **--target_lang** with one optional parameter of **-o** or **--output_dir** to specify the location of the new translation file.

- `filename` - the name of the file to translate (can include a path)
- `-t`/`--target_lang` - a 2-digit language identifier used to inform what the target language is
- `-o`/`--output_dir` - the path to where you want the file to be output. A filename will be generate, so don't include one. If left blank, the file will be placed the same location as the input directory.

```
USAGE
  $ decyphr json [FILE]

OPTIONS
  -h, --help                     show CLI help
  -o, --output_dir=output_dir    The dir that you want the new file to be placed in
  -t, --target_lang=target_lang  Two-character code for the target language

EXAMPLES
  $ decyphr json en.json -t pt
  $ decyphr json en.json --target_lang pt
  $ decyphr json en.json -t pt -o translations/
  $ decyphr json en.json --target_lang pt --output_dir translations/
```

Translate the en.json file that's in the `translations` folder and output the Portuguese translations to the same folder -

```bash
decyphr json translations/en.json -t pt
# outputs - a new file called `pt.json` in the `translations` directory
```

Or translate the en.json file that's in the `translations` folder and output the Portuguese translations to current directory -

```bash
decyphr json translations/en.json -t pt -o ./
# outputs - a new file called `pt.json` in the current directory
```

The input langauge will be determined based on the content being translated, rather than the name of the file or any other flag.

To see examples of what the output looks like then checkout the `examples` folder. In all cases the source language used was English, and any non-`en.json` files were automatically generated using this command.

#### `yaml`

`yaml` will translate a YAML file that you specify and generate the translated file with the language specified.

This takes one required argument of **filename** and one required flag of **-t** or **--target_lang** with one optional parameter of **-o** or **--output_dir** to specify the location of the new translation file.

- `filename` - the name of the file to translate (can include a path)
- `-t`/`--target_lang` - a 2-digit language identifier used to inform what the target language is
- `-o`/`--output_dir` - the path to where you want the file to be output. A filename will be generate, so don't include one. If left blank, the file will be placed the same location as the input directory

```bash
Translates a YAML file and generates a new file containing the translations

USAGE
  $ decyphr yaml [FILE]

OPTIONS
  -h, --help                     show CLI help
  -o, --output_dir=output_dir    The dir that you want the new file to be placed in
  -t, --target_lang=target_lang  Two-character code for the target language

EXAMPLES
  $ decyphr yaml en.yaml -t pt
  $ decyphr yaml en.yaml --target_lang pt
  $ decyphr yaml en.yaml -t pt -o translations/
  $ decyphr yaml en.yaml --target_lang pt --output_dir translations/
```

Translate the en.yaml file that's in the `translations` folder and output the Portuguese translations to the same folder -

```bash
decyphr yaml translations/en.yaml -t pt
# outputs - a new file called `pt.yaml` in the `translations` directory
```

Or translate the en.yaml file that's in the `translations` folder and output the Portuguese translations to current directory -

```bash
decyphr yaml translations/en.yaml -t pt -o ./
# outputs - a new file called `pt.yaml` in the current directory
```

The input langauge will be determined based on the content being translated, rather than the name of the file or any other flag.

To see examples of what the output looks like then checkout the `examples` folder. In all cases the source language used was English, and any non-`en.yaml` files were automatically generated using this command.

#### `php`

**NOTE:** There is a known bug in the PHP translator, in that it doesn't honour the order in the output file. All of the keys will remain, and are translated correctly, order is just not the same as the input file.

`php` will translate a PHP file that you specify and generate the translated file with the language specified.

This takes one required argument of **filename** and one required flag of **-t** or **--target_lang** with one optional parameter of **-o** or **--output_dir** to specify the location of the new translation file.

- `filename` - the name of the file to translate (can include a path)
- `-t`/`--target_lang` - a 2-digit language identifier used to inform what the target language is
- `-o`/`--output_dir` - the path to where you want the file to be output. A filename will be generate, so don't include one. If left blank, the file will be placed the same location as the input directory

```bash
Translates a PHP file and generates a new file containing the translations

USAGE
  $ decyphr php [FILE]

OPTIONS
  -h, --help                     show CLI help
  -o, --output_dir=output_dir    The dir that you want the new file to be placed in
  -t, --target_lang=target_lang  Two-character code for the target language

EXAMPLES
  $ decyphr php en.php -t pt
  $ decyphr php en.php --target_lang pt
  $ decyphr php en.php -t pt -o translations/
  $ decyphr php en.php --target_lang pt --output_dir translations/


```

Translate the en.php file that's in the `translations` folder and output the Portuguese translations to the same folder -

```bash
decyphr php translations/en.php -t pt
# outputs - a new file called `pt.php` in the `translations` directory
```

Or translate the en.php file that's in the `translations` folder and output the Portuguese translations to current directory -

```bash
decyphr php translations/en.php -t pt -o ./
# outputs - a new file called `pt.php` in the current directory
```

The input langauge will be determined based on the content being translated, rather than the name of the file or any other flag.

To see examples of what the output looks like then checkout the `examples` folder. In all cases the source language used was English, and any non-`en.php` files were automatically generated using this command.

#### `text`

NOTE - Configuration files are not supported with the text translator

`text` is a simple command that will translate a given piece of text and translate it to the target language.

This takes one required argument of **text** and one required flag of **-t** or **--target_lang**.

- `text` - a string of text that you want to translate
- `-t`/`--target_lang` - a 2-digit language identifier used to inform what the target language is

```bash
USAGE
  $ decyphr text [TEXT]

OPTIONS
  -h, --help                     show CLI help
  -t, --target_lang=target_lang  Two-character code for the target language

EXAMPLES
  $ decyphr text hello -t pt
  $ decyphr text hello --target_lang pt
  $ decyphr text "tudo bem?" --target_lang en
```

For example, to translate the word **hello** into Portuguese, then use -

```bash
decyphr text hello -t pt
# outputs - "hello" translates to "Olá"
```

Longer strings of text can also be used -

```bash
decyphr text "hello, my name is Aaron" -t pt
# outputs - "hello, my name is Aaron" translates to "Olá, meu nome é Aaron"
```

The input language is automatically determined, so you don't need to specify the input language, and you can use any language as input -

```bash
decyphr text "esta frase é portuguesa e será traduzida para o francês" -t fr
# outputs - "esta frase é portuguesa e será traduzida para o francês" translates to "cette phrase est portugaise et sera traduite en français"
```

#### `supported_languages`

Returns a list of the supported language codes and the names of the languages.

```bash
Outputs the list of supported languages

USAGE
  $ decyphr supported_languages

EXAMPLE
  $ decyphr supported_languages
```

#### `find_language`

This command will allow you to search for a language in our list of supported languages based on the language name or the code.

This command has two available flags:

- `-c`/`--code` - a 2-digit language identifier
- `-n`/`--name` - the name of the language

If both flags are provided, `-c` will override `-n`

```bash
Search for a language based on the code or name

USAGE
  $ decyphr find_language

OPTIONS
  -c, --code=code  Two-character code for the target language
  -h, --help       show CLI help
  -n, --name=name  The name of the langauge you want to check

EXAMPLES
  $ decyphr find_language -n Portuguese
  $ decyphr find_language -c pt
```

If you search for a language name that can be found easily, it will output the language code and name:

```bash
decyphr find_language -n portuguese
# outputs - pt => Portuguese
```

Same for the code:

```bash
decyphr find_language -c pt
# outputs - pt => Portuguese
```

If an item can't be found it will return an error suggesting to lookup the entire list:

```bash
decyphr find_language -c pa
# outputs - Error: Could not find pt. Try tunning 'supported_languages'
```

And if you code that contains more or less than two characters an error will be thrown:

```bash
decyphr find_language -c pt-br
# outputs - Error: Language code: pt-br should only contain 2 characters
```

## Contributions

I would like _decyphr-i18nr_ to be as widely supported as possible. Not just in Node or PHP environments, however I don't have a whole of experience with working with Internationalization in any frameworks beyond Django and React so any contributions to _decyphr-i18nr_ would be more than welcome. If something is missing that you would like, or if you find any bugs, or anything else then fork the repo, make your changes and issue a pull request and I will review the changes.

The [projects page](https://github.com/decyphr-net/i18nr/projects) on Github has a list of features that I have planned to work on, so if there's something that you would like to work on, either choose it from there or create a new item to work on.

## Issues

If you find any issues, please log them as issues in [GitHub](https://github.com/decyphr-net/i18nr/issues) so that they can be worked on, or if you'd like, fix the code and create a pull request.
