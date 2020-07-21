import {expect, test} from '@oclif/test'

describe('translate-file', () => {
  test
  .stdout()
  .command(['translate-file', 'i18n/en.json', '--target_lang', 'pt'])
  .it('runs translate-file i18n/en.json --target_lang pt', ctx => {
    expect(ctx.stdout).to.contain('task complete')
  })
})
