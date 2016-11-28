/* eslint-env jest */

import parsePairs from './'

it('parse key=value pairs in a string', () => {
  expect(parsePairs('key1=value1 key2=value2')).toEqual({
    key1: 'value1',
    key2: 'value2'
  })
})

it('support simple quotes', () => {
  expect(parsePairs("key='value with spaces' 'key with spaces'=value")).toEqual({
    key: 'value with spaces',
    'key with spaces': 'value'
  })
})

it('support double quotes', () => {
  expect(parsePairs('key="value with spaces" "key with spaces"=value')).toEqual({
    key: 'value with spaces',
    'key with spaces': 'value'
  })
})

it('whitespaces around pairs are ignored', () => {
  expect(parsePairs('  key1=value1  key2=value2  ')).toEqual({
    key1: 'value1',
    key2: 'value2'
  })
})
