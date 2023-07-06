# DataMasker

- An npm package for masking sensitive data, built for both the ECMAScript Module format (i.e. ESM or ES Module) and CommonJS Module format (CJS). It can be used in Node.js and browser applications.
- Utilizing DataMasting for sensitive information within app.
## Installation

```bash
npm i @am.hofney/data-masker
```

## Usage

```javascript
const maskingConfig: MaskConfigInput = {
  data: string;
  keys: string[];
  values?: string[];
  mask?: string;
};
const maskedData = new DataMasker(maskingConfig).run();
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.
