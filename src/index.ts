import { snakeCase } from "snake-case";
import { MaskConfigInput } from "./mask-config.input";

export default class DataMasker {
  private data: string;
  private mask: string;
  private keys: string[];
  private secrets: string[];

  /**
   * This is a constructor function that initializes an object with properties based on the input
   * configuration.
   * @param {MaskConfigInput} config - The `config` parameter is an object that contains the following
   * optional properties:
   */
  constructor(config: MaskConfigInput) {
    this.data = config?.data || "";
    this.mask = config?.mask || "******";
    this.keys = [
      ...config?.keys,
      ...config?.keys?.map((key: string) => snakeCase(key)),
    ];
    this.secrets = config?.values || [];
  }

  /**
   * The "run" function replaces specified keys and secrets in a JSON string with a mask.
   * @returns The `run()` function is returning the modified `data` string after replacing the
   * specified JSON keys and secrets with the mask value.
   */
  run() {
    this.keys.forEach((key: string) => {
      this.replaceJsonKey(key);
      this.replaceStringKey(key);
    });

    this.secrets.forEach((secret: string) => {
      this.data = this.data.replace(secret, this.mask);
    });
    return this.data;
  }

  /**
   * This function replaces a JSON key with a masked value in a given string.
   * @param {string} key - The `key` parameter is a string representing the key in a JSON object that
   * needs to be replaced with a masked value.
   */
  private replaceJsonKey(key: string) {
    const stringQuote = "('|\")?";
    const skipSpaces = "\\s*";
    const matchEverything = "(.*)";
    const regex = new RegExp(
      "(" +
        stringQuote +
        key +
        stringQuote +
        skipSpaces +
        ":" +
        skipSpaces +
        stringQuote +
        matchEverything +
        stringQuote +
        ")"
    );
    this.data = this.data.replace(regex, '"' + key + '":"' + this.mask + '"');
  }

  /**
   * This function replaces a specific key in a string with a mask value.
   * @param {string} key - The `key` parameter is a string representing the key in a query string that
   * needs to be replaced with a mask.
   */
  private replaceStringKey(key: string) {
    const regex = new RegExp(`${key}=[^&]+`, "g");
    this.data = this.data.replace(regex, `${key}=${this.mask}&`);
  }
}
