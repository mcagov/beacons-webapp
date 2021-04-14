import axios from "axios";

export class BeaconsApiGateway {
  private apiUrl: string;
  constructor() {
    this.apiUrl = process.env.API_URL;
  }

  public async post(endpoint: string, json: any): Promise<boolean> {
    const url = `${this.apiUrl}/${endpoint}`;

    try {
      await axios.post(url, json);
      return true;
    } catch (error) {
      return false;
    }
  }
}
