import { FormCacheFactory } from "../lib/formCache";
import { Registration } from "../lib/registration/registration";

export const saveCachedRegistration = async (
  submissionId: string,
  registration: Registration
): Promise<void> =>
  await FormCacheFactory.getCache().set(submissionId, registration);
