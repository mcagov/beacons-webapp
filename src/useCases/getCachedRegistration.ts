import { FormCacheFactory } from "../lib/formCache";
import { Registration } from "../lib/registration/registration";

export type GetCachedRegistrationFn = (
  submissionId: string
) => Promise<Registration>;

export const getCachedRegistration: GetCachedRegistrationFn = async (
  submissionId: string
): Promise<Registration> => await FormCacheFactory.getCache().get(submissionId);
