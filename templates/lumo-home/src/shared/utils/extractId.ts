// import type { CollectionSlug } from 'payload'
// import type { Config } from '@/payload-types'

export const extractID = <T extends { id: number }>(
	objectOrID: number | T,
): number => {
	if (objectOrID && typeof objectOrID === "object") return objectOrID.id;

	return objectOrID;
};
