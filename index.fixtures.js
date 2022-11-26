"use strict";

module.exports = {
  "parse key=value pairs in a string": {
    string: "key1=value1 key2=value2",
    object: {
      key1: "value1",
      key2: "value2",
    },
  },
  "support simple quotes": {
    string: "key='value with spaces' 'key with spaces'=value",
    object: {
      key: "value with spaces",
      "key with spaces": "value",
    },
  },
  "support double quotes": {
    string: 'key="value with spaces" "key with spaces"=value',
    object: {
      key: "value with spaces",
      "key with spaces": "value",
    },
  },
  "white spaces around pairs are ignored": {
    string: "  key1=value1  key2=value2  ",
    object: {
      key1: "value1",
      key2: "value2",
    },
  },
  "\\n and \\r are valid white spaces": {
    string: "key1=value1\nkey2=value2\rkey3=value3",
    object: {
      key1: "value1",
      key2: "value2",
      key3: "value3",
    },
  },
  "handle single line comments": {
    string: [
      "# at the beginining of the string",
      "key1=value1 # at the end of a line",
      "# on an empty line",
      "key2=value2",
      "# at the end of the string",
    ].join("\n"),
    object: {
      key1: "value1",
      key2: "value2",
    },
  },
};
