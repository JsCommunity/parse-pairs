/* eslint-env jest */

import { forEach } from "lodash";

import fixtures from "./index.fixtures";
import parsePairs, { createParser } from "./";

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
});
