export type TEntity = {
	id: string;
	alsoKnownAs: string;
	accounts: any[];
	context: any[];
	linkedEntity: any[];
	linkedResource: any[];
	metadata: any;
	owner: string;
	service: any[];
	settings: any[];
	type: string;
	status: number;
	relayerNode: string;
	externalId: string;
	controller: string[];
	entityVerified: boolean;
	endDate: string;
	startDate: string;
	linkedClaim: any[];
};

export type TTokenTransactions = {
	amount: string;
	token: {
		id: string;
		index: string;
	};
};

export type TEvaluations = {
	evaluationDate: string;
	verificationProof: string;
};
