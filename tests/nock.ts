import nock from "nock";
import { URL } from "../src/services/api";

const allowedHeaders = [
  "ClientName",
  "ClientVersion",
  "Content-Type",
  "Authorization",
];

const nockHeaders = {
  "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": allowedHeaders.join(","),
};

export class PostNock {
  private readonly scope: nock.Scope;

  public constructor() {
    this.scope = nock(URL);
  }

  public success(
    response: Record<string, unknown> | Array<Record<string, unknown>>,
    path: string
  ): void {
    this.setupRequest(path).reply(201, response, nockHeaders).persist();
  }

  private setupRequest(path: string): nock.Interceptor {
    nock.disableNetConnect();
    return nock(URL).post(path);
  }
}
