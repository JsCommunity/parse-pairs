"use strict";

const assert = require("assert");
const { describe, it } = require("test");
const forEach = require("lodash/forEach");

const fixtures = require("./index.fixtures");
const { createParser, parsePairs } = require("./");

describe("parsePairs()", () => {
  forEach(fixtures, (data, description) => {
    it(description, () => {
      assert.deepStrictEqual(parsePairs(data.string), data.object);
    });
  });
});

describe("createParser()", () => {
  it("supports key and value transforms", () => {
    const parse = createParser({
      keyTransform: (key) => key.toUpperCase(),
      valueTransform: (value, key) =>
        key === "AGE" ? +value : value.toLowerCase(),
    });

    assert.deepStrictEqual(parse("kEY1=valUE1 KEY2=ValUe2 AGe=68"), {
      KEY1: "value1",
      KEY2: "value2",
      AGE: 68,
    });
  });

  it("supports custom characters as non-delimiters", () => {
    const parse = createParser({
      isRawStringChar: (c) =>
        c === "!" ||
        (c >= "0" && c <= "9") ||
        (c >= "A" && c <= "Z") ||
        (c >= "a" && c <= "z"),
    });

    assert.deepStrictEqual(parse("key:!value"), {
      key: "!value",
    });

    assert.deepStrictEqual(parse("key!:value"), {
      "key!": "value",
    });

    assert.deepStrictEqual(parse("key_value"), {
      key: "value",
    });
  });

  it("supports custom whitespace characters", () => {
    const parse = createParser({
      isWhitespace: (c) => c === "%",
    });

    assert.deepStrictEqual(parse("%KEY1=value1%KEY2=value2%"), {
      KEY1: "value1",
      KEY2: "value2",
    });
  });
});
