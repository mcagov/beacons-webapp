import { appContainer, IAppContainer } from "../lib/appContainer";

export const deleteCachedUse =
  ({ cachedRegistrationGateway }: Partial<IAppContainer> = appContainer) =>
  async (submissionId: string, useIndex: number): Promise<void> => {
    await cachedRegistrationGateway.deleteUse(submissionId, useIndex);
  };
