const identity = x => x;

const isRawStringChar = c =>
  c === "-" ||
  c === "_" ||
  (c >= "0" && c <= "9") ||
  (c >= "A" && c <= "Z") ||
  (c >= "a" && c <= "z");

const isWhitespace = c => c === " " || c === "\n" || c === "\r";

export const createParser = ({
  keyTransform = identity,
  valueTransform = identity,
} = {}) => {
  let i, input, n, pairs;

  const assert = c => {
    if (!(i < n) && input[i] !== c) {
      throw new Error(`missing character ${c} at offset ${i}`);
    }
    ++i;
  };

  const parsePair = () => {
    const key = keyTransform(parseString());
    assert("=");
    pairs[key] = valueTransform(parseString(), key);
  };
  const parseString = () => {
    if (i < n) {
      let value = "";

      let c = input[i];
      if (c === "'" || c === '"') {
        const q = c;
        ++i;

        while (i < n && (c = input[i]) !== q) {
          value += c;
          ++i;
        }

        assert(q);

        return value;
      }

      if (isRawStringChar(c)) {
        do {
          value += c;
          ++i;
        } while (i < n && isRawStringChar((c = input[i])));

        return value;
      }
    }

    throw new Error(`missing string at offset ${i}`);
  };
  const parseWs = () => {
    while (i < n && isWhitespace(input[i])) {
      ++i;
    }
  };

  return input_ => {
    if (typeof input_ !== "string") {
      throw new TypeError("input should be a string");
    }

    try {
      // assign global variables
      i = 0;
      input = input_;
      n = input.length;
      pairs = {};

      parseWs();
      // eslint-disable-next-line no-unmodified-loop-condition
      while (i < n) {
        parsePair();
        parseWs();
      }

      return pairs;
    } finally {
      // free global variables
      input = pairs = null;
    }
  };
};

export default createParser();
