import {expect, test} from '@oclif/test'

describe('text', () => {
  test
  .stdout()
  .command(['text', 'hello', '--target_lang', 'pt'])
  .it('runs text hello --target_lang pt', ctx => {
    expect(ctx.stdout).to.contain('"hello" translates to "Olá"')
  })
})
