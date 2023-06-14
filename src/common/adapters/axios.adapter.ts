import axios from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private axios = axios;
  async get<T>(url: string) {
    try {
      const { data } = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error('Ocurrió un error, contacte a soporte');
    }
  }
}
