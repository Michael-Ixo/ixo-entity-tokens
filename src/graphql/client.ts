import { ApolloClient, DefaultOptions, InMemoryCache } from '@apollo/client';

const defaultOptions: DefaultOptions = {
	watchQuery: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'ignore',
	},
	query: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'all',
	},
};

export const ApolloGraphqlClient = new ApolloClient({
	uri: 'https://blocksync-graphql.ixo.earth/graphql',
	cache: new InMemoryCache(),
	defaultOptions,
});
