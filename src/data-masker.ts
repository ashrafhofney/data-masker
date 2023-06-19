import { snakeCase } from "snake-case";
import { MaskConfigInput } from "./mask-config.input";

export class DataMasker {
  private data: string;
  private mask: string;
  private keys: string[];
  private secrets: string[];

  constructor(config: MaskConfigInput) {
    this.data = config?.data || "";
    this.mask = config?.mask || "******";
    this.keys = [
      ...config?.keys,
      ...config?.keys?.map((key) => snakeCase(key)),
    ];
    this.secrets = config?.values || [];
  }

  run() {
    this.keys.forEach((key) => {
      this.replaceJsonKey(key);
      this.replaceStringKey(key);
    });

    this.secrets.forEach((secret) => {
      this.data = this.data.replace(secret, this.mask);
    });
    return this.data;
  }

  private replaceJsonKey(key) {
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

  private replaceStringKey(key) {
    const regex = new RegExp(`${key}=[^&]+`, "g");
    this.data = this.data.replace(regex, `${key}=${this.mask}&`);
  }
}
