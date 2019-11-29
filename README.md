# parse-pairs

[![Package Version](https://badgen.net/npm/v/parse-pairs)](https://npmjs.org/package/parse-pairs) [![Build Status](https://travis-ci.org/JsCommunity/parse-pairs.png?branch=master)](https://travis-ci.org/JsCommunity/parse-pairs) [![PackagePhobia](https://badgen.net/packagephobia/install/parse-pairs)](https://packagephobia.now.sh/result?p=parse-pairs) [![Latest Commit](https://badgen.net/github/last-commit/JsCommunity/parse-pairs)](https://github.com/JsCommunity/parse-pairs/commits/master)

> Parse key-value pairs

## Install

Installation of the [npm package](https://npmjs.org/package/parse-pairs):

```
> npm install --save parse-pairs
```

## Usage

```js
import parsePairs from "parse-pairs";

parsePairs('Batman="Bruce Wayne" "Wonder Woman"="Diana Prince"');
// {
//   Batman: 'Bruce Wayne',
//   'Wonder Woman': 'Diana Prince'
// }
```

- both keys and values can be quoted
- single and double quotes are supported
- white spaces around pairs are ignored
- no escape sequences, feel free to open an [issue](https://github.com/JsCommunity/parse-pairs/issues/) or [PR](https://github.com/JsCommunity/parse-pairs/pulls) if necessary

### Custom parser

> For advanced needs, you can create a custom parser.

```js
import { createParser } from 'parse-pairs'

const parse = createParser({
  keyTransform: lodash.cameCase,
  valueTransform: (value, key) => lodash.startCase(value.toLowerCase())
})

parse('BATMAN="BRUCE WAYNE" "WONDER WOMAN"="DIANA PRINCE"')
{
  batman: 'Bruce Wayne',
  wonderWoman: 'Diana Prince'
}
```

## Development

```
# Install dependencies
> npm install

# Run the tests
> npm test

# Continuously compile
> npm run dev

# Continuously run the tests
> npm run dev-test

# Build for production (automatically called by npm install)
> npm run build
```

## Contributions

Contributions are _very_ welcomed, either on the documentation or on
the code.

You may:

- report any [issue](https://github.com/JsCommunity/parse-pairs/issues)
  you've encountered;
- fork and create a pull request.

## License

ISC © [Julien Fontanet](https://github.com/julien-f)
