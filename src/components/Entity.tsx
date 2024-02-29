import { Button, TextInput, Loader, Text, Space } from '@mantine/core';
import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_ENTITIES_BY_EXTERNAL_ID, GET_ENTITY_BY_DID } from '../graphql/queries';

type params = {
	set: (e: any) => void;
};

function entity(p: params) {
	const [getEntityDid, byDid] = useLazyQuery(GET_ENTITY_BY_DID);
	const [getEntityExternalId, byExternalId] = useLazyQuery(GET_ENTITIES_BY_EXTERNAL_ID);

	const [value, setValue] = useState('');
	const [error, seterror] = useState<undefined | string>(undefined);

	const handleClick = async () => {
		p.set(null);

		// clear current errors
		byDid.error = undefined;
		byExternalId.error = undefined;
		seterror(undefined);

		if (value.startsWith('did:')) {
			const data = await getEntityDid({ variables: { entityDid: value } });
			if (!data.data) {
				seterror('No entity found');
			} else {
				p.set(data.data.entity);
			}
			// console.log(data);
		} else {
			const data = await getEntityExternalId({ variables: { externalId: value } });
			if (!data.data?.entities?.nodes?.length) {
				seterror('No entity found');
			} else {
				p.set(data.data.entities.nodes[0]);
			}
			// console.log(data);
		}
	};

	return (
		<div>
			<TextInput label="Entity" description="Input did or external id" value={value} onChange={event => setValue(event.currentTarget.value)} />
			<Space h={5} />
			{byDid.loading || byExternalId.loading ? (
				<Loader />
			) : (
				<Button variant="filled" onClick={handleClick}>
					Fetch Entity
				</Button>
			)}
			{byDid.error || byExternalId.error || error ? <Text c="red">{byDid.error?.message || byExternalId.error?.message || error}</Text> : null}
		</div>
	);
}

export default entity;
