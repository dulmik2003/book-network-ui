/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookResponse } from '../../models/book-response';

export interface FindBookId$Params {
  'book-id': number;
}

export function findBookId(http: HttpClient, rootUrl: string, params: FindBookId$Params, context?: HttpContext): Observable<StrictHttpResponse<BookResponse>> {
  const rb = new RequestBuilder(rootUrl, findBookId.PATH, 'get');
  if (params) {
    rb.path('book-id', params['book-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BookResponse>;
    })
  );
}

findBookId.PATH = '/books/get/{book-id}';
