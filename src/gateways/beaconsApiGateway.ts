import axios from "axios";
import { Registration } from "../lib/registration/registration";

export class BeaconApiGateway {
  private apiUrl: string;
  constructor() {
    this.apiUrl = process.env.BEACONS_API_URL;
  }

  public async sendRegistration(registration: Registration): Promise<boolean> {
    const serializedRegistration = registration.serialiseToAPI();

    try {
      return await axios.post(this.apiUrl, serializedRegistration);
    } catch (error) {
      return error;
    }
  }
}
