module.exports = {
  "extends": ["eslint:recommended"],
  "rules": {
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "script"
  },
  "globals": {
    "window": true
  },
  "env": {
    "browser": false,
    "node": true,
    "es6": true,
    "mocha": true
  }
}
