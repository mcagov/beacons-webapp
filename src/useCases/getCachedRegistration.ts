import { FormCacheFactory } from "../lib/formCache";
import { Registration } from "../lib/registration/registration";

export const getCachedRegistration = async (
  submissionId: string
): Promise<Registration> => await FormCacheFactory.getCache().get(submissionId);
