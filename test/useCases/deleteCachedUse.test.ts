import { deleteCachedUse } from "../../src/useCases/deleteCachedUse";

describe("deleteCachedUse", () => {
  it("calls the injected CachedRegistrationGateway to delete the cached use", async () => {
    const submissionId = "test-submissionId";
    const useIndex = 0;
    const container = {
      cachedRegistrationGateway: {
        deleteUse: jest.fn(),
      },
    };

    await deleteCachedUse(container)(submissionId, useIndex);

    expect(container.cachedRegistrationGateway.deleteUse).toHaveBeenCalledWith(
      submissionId,
      useIndex
    );
  });

  it("throws if there is an error during deletion", async () => {
    const submissionId = "test-submissionId";
    const useIndex = 0;
    const container = {
      cachedRegistrationGateway: {
        deleteUse: jest.fn().mockImplementation(() => {
          throw new Error();
        }),
      },
    };

    await expect(
      deleteCachedUse(container)(submissionId, useIndex)
    ).rejects.toThrow();
  });
});
