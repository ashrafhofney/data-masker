# modern-npm-package

An npm package for masking sensitive data, built for both the ECMAScript Module format (i.e. ESM or ES Module) and CommonJS Module format (CJS). It can be used in Node.js and browser applications.

## Usage

```code
new DataMasker({}).run({
  data // string | json string
  keys // string array of your sensitive attributes holding values
  values // optional string array of exact values you want to mask
  mask // mask string default is ******
});
```
