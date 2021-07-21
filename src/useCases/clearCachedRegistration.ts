import { FormCacheFactory } from "../lib/formCache";

export const clearCachedRegistration = async (
  submissionId: string
): Promise<void> => await FormCacheFactory.getCache().clear(submissionId);
