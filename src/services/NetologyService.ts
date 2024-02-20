import axios, {AxiosInstance} from "axios";
import { wrapper } from 'axios-cookiejar-support';
import {CookieJar} from 'tough-cookie';

export type LoginDTO = {
  login: string
  password: string
}

export type NetologyWebinar = {
  id: number,
  starts_at: string,
  ends_at: string,
  title: string,
}

export class NetologyService {
  protected axios: AxiosInstance;
  protected jar: CookieJar;

  constructor() {
    const jar = new CookieJar;
    const client = axios.create({
      baseURL: 'https://netology.ru/',
      withCredentials: true,
      jar
    });
    this.axios = wrapper(client);

    this.jar = jar;
  }
  async login({ login, password }: LoginDTO) {
    const response = await this.axios.post('/backend/api/user/sign_in', {
      login,
      password
    });

    const user = response.data?.app_options?.user;

    if (!user) {
      throw new Error('Login failed');
    }

    return user;
  }
  async getSchedule() {
    const response = await this.axios.get('/backend/api/expert/schedule');

    return response.data.webinars as NetologyWebinar[];
  }
}