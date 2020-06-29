import {expect, test} from '@oclif/test'

describe('translate-text', () => {
  test
  .stdout()
  .command(['translate-text', 'hello', '--target_lang', 'pt'])
  .it('runs translate-text hello --target_lang pt', ctx => {
    expect(ctx.stdout).to.contain('"hello" translates to "Olá"')
  })
})
