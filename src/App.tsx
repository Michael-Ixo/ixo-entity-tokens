import '@mantine/core/styles.css';
import { Container, MantineProvider, Space, Text } from '@mantine/core';
import { theme } from './theme';
import { ApolloProvider } from '@apollo/client';
import { ApolloGraphqlClient } from './graphql/client';
import Entity from './components/Entity';
import { useState } from 'react';
import { TEntity } from './types/blocksync';
import MintedTokens from './components/MintedTokens';

function App() {
	const [entity, setEntity] = useState<null | TEntity>(null);

	const setEntityFunc = (e: TEntity | null) => {
		setEntity(e);
	};

	return (
		<MantineProvider theme={theme}>
			<ApolloProvider client={ApolloGraphqlClient}>
				<Container my={10}>
					<Text size="xl">Show entity tokens</Text>
					<Space h={10} />
					<Entity set={setEntityFunc} />
					<Space h={20} />
					{entity ? <MintedTokens account={entity.accounts.find(a => a.name === 'admin')?.address ?? ''} /> : null}
					<Space h={20} />
				</Container>
			</ApolloProvider>
		</MantineProvider>
	);
}

export default App;
