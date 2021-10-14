import Redis from "ioredis";
import JSONCache from "redis-json";
import { DraftRegistration } from "../entities/DraftRegistration";
import { DraftRegistrationGateway } from "./interfaces/DraftRegistrationGateway";

export class RedisDraftRegistrationGateway implements DraftRegistrationGateway {
  private cache = new JSONCache<DraftRegistration>(
    new Redis(process.env.REDIS_URI)
  );
  private static gatewayInstance: DraftRegistrationGateway;

  static getGateway(): DraftRegistrationGateway {
    if (!RedisDraftRegistrationGateway.gatewayInstance) {
      RedisDraftRegistrationGateway.gatewayInstance =
        new RedisDraftRegistrationGateway();
    }

    return RedisDraftRegistrationGateway.gatewayInstance;
  }

  public async read(id: string): Promise<DraftRegistration> {
    return (await this.cache.get(id)) as DraftRegistration;
  }

  public async update(
    id: string,
    draftRegistration: DraftRegistration
  ): Promise<void> {
    await this.cache.set(id, draftRegistration);
  }

  public async delete(id: string): Promise<void> {
    await this.cache.del(id);
  }

  public async createEmptyUse(submissionId: string): Promise<void> {
    const registration: DraftRegistration = await this.read(submissionId);

    const registrationWithNewUse = {
      ...registration,
      uses: [...(registration?.uses || []), {}],
    };

    await this.update(submissionId, registrationWithNewUse);
  }

  public async deleteUse(submissionId: string, useId: number): Promise<void> {
    const registration: DraftRegistration = await this.read(submissionId);

    const registrationMinusDeletedUse = {
      ...registration,
      uses: registration.uses.filter((use, i) => i !== useId),
    };

    await this.update(submissionId, registrationMinusDeletedUse);
  }
}
