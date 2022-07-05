import axios, { AxiosInstance } from 'axios';

import { Repository } from '~/repositories/index';
import { AccessTokenRepository } from '~/repositories/AccessTokenRepository';
import { Config } from '~/repositories/config';
import { errorHandler } from '~/lib/error';
import { NullError } from '~/models/NullError';
import { ProjectResponse } from '~/repositories/responses/Project';
import { ProjectRequest } from '~/repositories/requests/Project';

export class ProjectsRepository implements Repository {
  readonly $axios: AxiosInstance;

  getList(): Promise<ProjectResponse[]> {
    return AccessTokenRepository.getInstance()
      .get()
      .then((token) => {
        return this.$axios
          .get<ProjectResponse[]>(Config.getTokenList, {
            headers: { token },
          })
          .then((res) => Promise.resolve(res.data));
      })
      .catch((e) => {
        errorHandler(ProjectsRepository, e?.response?.data);

        return Promise.reject(new NullError(e));
      });
  }

  create(serviceToken: ProjectRequest): Promise<ProjectResponse> {
    if (serviceToken) {
      return AccessTokenRepository.getInstance()
        .get()
        .then((token) => {
          return this.$axios
            .post<ProjectResponse>(
              Config.createToken,
              {
                id: serviceToken.id,
                name: serviceToken.name,
                died_at: serviceToken.diedAt,
                service_token: serviceToken.serviceToken,
              },
              {
                headers: { token },
              },
            )
            .then((res) => Promise.resolve(res.data));
        })
        .catch((e) => {
          errorHandler(ProjectsRepository, e?.response?.data);

          return Promise.reject(new NullError(e));
        });
    } else {
      errorHandler(ProjectsRepository);

      return Promise.reject(
        new NullError('ProjectsRepositoryCreate: one or more fields are empty'),
      );
    }
  }

  delete(id: number): Promise<void> {
    if (typeof id !== undefined) {
      return AccessTokenRepository.getInstance()
        .get()
        .then((token) => {
          return this.$axios
            .delete<void>(Config.deleteToken + `/${id}`, {
              headers: { token },
            })
            .then(() => Promise.resolve(undefined));
        })
        .catch((e) => {
          errorHandler(ProjectsRepository, e?.response?.data);

          return Promise.reject(new NullError(e));
        });
    } else {
      errorHandler(ProjectsRepository);

      return Promise.reject(
        new NullError('ProjectsRepositoryDelete: id is empty'),
      );
    }
  }

  // Реализация singleton
  private static instance?: ProjectsRepository;

  private constructor() {
    this.$axios = axios.create({
      baseURL: process.env.APIHost,
    });
  }

  static getInstance(): ProjectsRepository {
    if (!ProjectsRepository.instance) {
      ProjectsRepository.instance = new ProjectsRepository();
    }

    return ProjectsRepository.instance;
  }
}
