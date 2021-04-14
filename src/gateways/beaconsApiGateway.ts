import axios from "axios";

export class BeaconsApiGateway {
  private apiUrl: string;
  private registrationsEndpoint = "registrations/register";

  constructor() {
    this.apiUrl = process.env.API_URL;
  }

  public async sendRegistration(json: any): Promise<boolean> {
    const url = `${this.apiUrl}/${this.registrationsEndpoint}`;

    try {
      await axios.post(url, json);
      return true;
    } catch (error) {
      return false;
    }
  }
}
