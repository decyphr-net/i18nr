import {expect, test} from '@oclif/test'

describe('json', () => {
  test
  .stdout()
  .command(['json', 'examples/json/nested/en.json', '--target_lang', 'pt'])
  .it('runs json examples/json/nested/en.json --target_lang pt', ctx => {
    expect(ctx.stdout).to.contain('contents of examples/json/nested/en.json read successfully...')
  })
})
