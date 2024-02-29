import { gql } from '@apollo/client';

export const GET_ENTITY_BY_DID = gql`
	query getEntity($entityDid: String!) {
		entity(id: $entityDid) {
			id
			alsoKnownAs
			accounts
			context
			linkedEntity
			linkedResource
			linkedClaim
			metadata
			owner
			service
			settings
			type
			status
			controller
			entityVerified
			endDate
			startDate
			externalId
			relayerNode
		}
	}
`;

export const GET_ENTITIES_BY_EXTERNAL_ID = gql`
	query getEntity($externalId: String!) {
		entities(filter: { externalId: { equalTo: $externalId } }) {
			nodes {
				id
				alsoKnownAs
				accounts
				context
				linkedEntity
				linkedResource
				linkedClaim
				metadata
				owner
				service
				settings
				type
				status
				controller
				entityVerified
				endDate
				startDate
				externalId
				relayerNode
			}
		}
	}
`;
// export async function getEntityByDid(graphqlClient: GraphqlClient, did: string, fields?: string[]) {
// 	const data = await graphqlClient.query({
// 		query: GET_ENTITY_BY_DID,
// 		variables: { entityDid: did },
// 	});
// 	const entity = Array.isArray(fields) && fields.length && data?.data?.entity ? ['id'].concat(fields).reduce((acc, key) => (!key ? acc : { ...acc, [key]: data?.data?.entity[key] }), {}) : data?.data?.entity;
// 	return entity;
// }

export const GET_ADDRESS_TOKEN_TRANSACTIONS = gql`
	query getTokens($toAddress: String!, $fromAddress: String!) {
		tokenTransactions(filter: { and: { to: { equalTo: $toAddress }, from: { equalTo: $fromAddress } } }, orderBy: PRIMARY_KEY_DESC) {
			nodes {
				amount
				token {
					id
					index
				}
			}
		}
	}
`;

export const GET_CLAIM_EVALUATIONS = gql`
	query getEvaluations($proofs: [String!]!) {
		evaluations(filter: { verificationProof: { in: $proofs } }) {
			nodes {
				evaluationDate
				verificationProof
			}
		}
	}
`;
