import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

export abstract class BaseServicesService {
  readonly #http = inject(HttpClient);

  protected getUrl(uri: string) {
    return 'http://localhost:8080/' + uri;
  }

  protected httpGet<T>(uri: string) {
    return lastValueFrom(this.#http.get<T>(this.getUrl(uri)));
  }

  protected httpPut<T>(uri: string, body?: unknown) {
    return lastValueFrom(this.#http.put<T>(this.getUrl(uri), body));
  }

  protected httpPost<T>(uri: string, body: unknown) {
    return lastValueFrom(this.#http.post<T>(this.getUrl(uri), body));
  }

  protected httpDelete<T>(uri: string) {
    return lastValueFrom(this.#http.delete<T>(this.getUrl(uri)));
  }
}
