/* eslint-env jest */

import { forEach } from 'lodash'

import fixtures from './index.fixtures'
import parsePairs from './'

forEach(fixtures, (data, description) => {
  it(description, () => {
    expect(parsePairs(data.string)).toEqual(data.object)
  })
})
