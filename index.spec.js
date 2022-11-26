/* eslint-env jest */

const forEach = require("lodash/forEach");

const fixtures = require("./index.fixtures");
const { createParser, parsePairs } = require("./");

describe("parsePairs()", () => {
  forEach(fixtures, (data, description) => {
    it(description, () => {
      expect(parsePairs(data.string)).toEqual(data.object);
    });
  });
});

describe("createParser()", () => {
  it("supports key and value transforms", () => {
    const parse = createParser({
      keyTransform: key => key.toUpperCase(),
      valueTransform: (value, key) =>
        key === "AGE" ? +value : value.toLowerCase(),
    });

    expect(parse("kEY1=valUE1 KEY2=ValUe2 AGe=68")).toEqual({
      KEY1: "value1",
      KEY2: "value2",
      AGE: 68,
    });
  });

  it("supports custom characters as non-delimiters", () => {
    const parse = createParser({
      isRawStringChar: c =>
        c === "!" ||
        (c >= "0" && c <= "9") ||
        (c >= "A" && c <= "Z") ||
        (c >= "a" && c <= "z"),
    });

    expect(parse("key:!value")).toEqual({
      key: "!value",
    });

    expect(parse("key!:value")).toEqual({
      "key!": "value",
    });

    expect(parse("key_value")).toEqual({
      key: "value",
    });
  });

  it("supports custom whitespace characters", () => {
    const parse = createParser({
      isWhitespace: c => c === "%",
    });

    expect(parse("%KEY1=value1%KEY2=value2%")).toEqual({
      KEY1: "value1",
      KEY2: "value2",
    });
  });
});
