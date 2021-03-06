export class CryptoCurrency {
	public ID_CRYPTO: string;
	public IS_ENABLE: boolean;

	constructor() {}
}

export class Site {
	public ID_WEBSITE: string;
	public NAME: string;
	public URL: string;
	public IS_ACTIVE: boolean;
	public CRYPTO_CURRENCY_WEBSITEs: CryptoCurrency[];
	public script: string;

	constructor() {
		let crypto = new CryptoCurrency();
		crypto.ID_CRYPTO = "BTC";
		crypto.IS_ENABLE = true;
		this.CRYPTO_CURRENCY_WEBSITEs = [];
		this.CRYPTO_CURRENCY_WEBSITEs.push(crypto);
		this.IS_ACTIVE = false;
	}
}
