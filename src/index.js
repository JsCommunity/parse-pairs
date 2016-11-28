const isRawStringChar = c =>
  c === '-' ||
  c === '_' ||
  c >= '0' && c <= '9' ||
  c >= 'A' && c <= 'Z' ||
  c >= 'a' && c <= 'z'

const parsePairs = input => {
  if (typeof input !== 'string') {
    throw new TypeError('input should be a string')
  }

  let i = 0
  const n = input.length
  const assert = c => {
    if (!(i < n) && input[i] !== c) {
      throw new Error(`missing character ${c} at offset ${i}`)
    }
    ++i
  }

  const parsePair = () => {
    const key = parseString()
    assert('=')
    const value = parseString()

    return { key, value }
  }
  const parseString = () => {
    if (i < n) {
      let value = ''

      let c = input[i]
      if (c === "'" || c === '"') {
        const q = c
        ++i

        while (i < n && (c = input[i]) !== q) {
          value += c
          ++i
        }

        assert(q)

        return value
      }

      if (isRawStringChar(c)) {
        do {
          value += c
          ++i
        } while (i < n && isRawStringChar(c = input[i]))

        return value
      }
    }

    throw new Error(`missing string at offset ${i}`)
  }
  const parseWs = () => {
    while (i < n && input[i] === ' ') {
      ++i
    }
  }

  const pairs = {}

  parseWs()
  while (i < n) { // eslint-disable-line no-unmodified-loop-condition
    const pair = parsePair()
    pairs[pair.key] = pair.value
    parseWs()
  }

  return pairs
}
export { parsePairs as default }
