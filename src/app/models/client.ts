export class Address {
	public STREET: string;
	public CITY: string;
	public ZIP_CODE: string;
	public COUNTRY: string;

	constructor() {}
}

export class Client {
	public NAME: string;
	public LASTNAME: string;
	public EMAIL_ADDRESS: string;
	public DATE_BIRTHDAY: Date;
	public HASH_PASSWORD: string;
	public CHECK_PASSWORD: string;
	public ADDRESS: Address;

	constructor() {
		this.ADDRESS = new Address();
	}
}
