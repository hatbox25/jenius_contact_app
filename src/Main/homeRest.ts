import env from '../Config/env';
import axios, { AxiosPromise } from 'axios';
import { Observable } from 'rxjs';

export default class homeRestService {
  getList = () => {
    return Observable.create((obs: any) => {
      axios.get(`${env}/contact`).then(resp => obs.next(resp.data)).catch(err => obs.error(err))
    });
  }

  load = (id: string) => {
    return Observable.create((obs: any) => {
      axios.get(`${env}/contact/${id}`).then(resp => obs.next(resp.data)).catch(err => obs.error(err))
    });
  }

  addContact = (data: any) => {
    return Observable.create((obs: any) => {
      axios.post(`${env}/contact`, data).then(resp => obs.next(resp.data)).catch(err => obs.error(err))
    });
  }

  deleteContact = (id: string) => {
    return Observable.create((obs: any) => {
      axios.delete(`${env}/contact/${id}`).then(resp => obs.next(resp.data)).catch(err => obs.error(err))
    });
  }

  editContact = (id: string, data: any) => {
    return Observable.create((obs: any) => {
      axios.put(`${env}/contact/${id}`, data).then(resp => obs.next(resp.data)).catch(err => obs.error(err))
    });
  }
}