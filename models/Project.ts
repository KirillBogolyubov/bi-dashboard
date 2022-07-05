import { ProjectResponse } from '~/repositories/responses/Project';
import { ProjectRequest } from '~/repositories/requests/Project';

export class ProjectModel {
  public id: number;
  public name: string;
  public diedAt: string;
  public serviceToken: string;

  public constructor(data: ProjectResponse | ProjectRequest) {
    this.id = data.id;
    this.name = data.name;
    if ('died_at' in data) {
      this.diedAt = data.died_at;
    } else {
      this.diedAt = data.diedAt;
    }
    if ('service_token' in data) {
      this.serviceToken = data.service_token;
    } else {
      this.serviceToken = data.serviceToken;
    }
  }
}
