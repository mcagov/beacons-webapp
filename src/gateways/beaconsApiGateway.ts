import axios from "axios";
import { Registration } from "../lib/registration/registration";

export class BeaconsApiGateway {
  private apiUrl: string;
  constructor() {
    this.apiUrl = process.env.BEACONS_API_URL;
  }

  public async sendRegistration(registration: Registration): Promise<boolean> {
    const serializedRegistration = registration.serialiseToAPI();

    try {
      await axios.post(this.apiUrl, serializedRegistration);
      return true;
    } catch (error) {
      return false;
    }
  }
}
