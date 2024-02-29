import { Loader, Text, Space, Table } from '@mantine/core';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_ADDRESS_TOKEN_TRANSACTIONS, GET_CLAIM_EVALUATIONS } from '../graphql/queries';
import { TEvaluations, TTokenTransactions } from '../types/blocksync';
import { useEffect } from 'react';

type params = {
	account: string;
};

function tokens(p: params) {
	const tokens = useQuery(GET_ADDRESS_TOKEN_TRANSACTIONS, {
		variables: { toAddress: p.account, fromAddress: '' },
	});
	const [getEvaluations, evaluations] = useLazyQuery(GET_CLAIM_EVALUATIONS);

	useEffect(() => {
		if (tokens.data?.tokenTransactions?.nodes?.length) {
			const proofs = tokens.data.tokenTransactions.nodes.map((t: TTokenTransactions) => t.token.index);
			getEvaluations({ variables: { proofs } });
		}
	}, [tokens.data?.tokenTransactions?.nodes?.length]);

	if (tokens.loading) return <Loader />;
	if (tokens.error) return <Text c="red">{tokens.error.message}</Text>;
	if (!tokens.data.tokenTransactions?.nodes?.length) return <Text c="grey">No tokens minted for this entity</Text>;

	const getEvalDataById = (id: string) => {
		if (evaluations?.loading) return <Loader />;
		if (evaluations?.error) return <Text c="red">{evaluations.error.message}</Text>;

		const date = new Date(evaluations?.data?.evaluations?.nodes?.find((e: TEvaluations) => e.verificationProof === id)?.evaluationDate);
		return date.toLocaleString();
	};

	const rows = tokens.data.tokenTransactions.nodes.map((t: TTokenTransactions) => (
		<Table.Tr key={t.token.id}>
			<Table.Td>{t.token.id}</Table.Td>
			<Table.Td>{t.amount}</Table.Td>
			<Table.Td>{t.token.index}</Table.Td>
			<Table.Td>{getEvalDataById(t.token.index)}</Table.Td>
		</Table.Tr>
	));

	return (
		<div>
			<Text>Tokens minted for this entity:</Text>
			<Space h={5} />
			<Table.ScrollContainer minWidth={500}>
				<Table stickyHeader highlightOnHover>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Id</Table.Th>
							<Table.Th>Amount</Table.Th>
							<Table.Th>Verified Emission Reduction Cert</Table.Th>
							<Table.Th>Date</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
		</div>
	);
}

export default tokens;
