import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Agendamento } from './agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  
 
  private resource = 'agendamento';
  api = environment.urlBase+'/'+this.resource;

  
  constructor(private httpClient: HttpClient) { }

  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

 
  getAgendamentos(): Observable<Agendamento[]> {
    return this.httpClient.get<Agendamento[]>(this.api)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

    
    getAgendamentoByID(valor:number): Observable<Agendamento> {
      return this.httpClient.get<Agendamento>(this.api+'/'+valor)
        .pipe(
          retry(2),
          catchError(this.handleError))
    }

   
    saveAgendamento(agendamento: Agendamento): Observable<Agendamento> {
      console.log( JSON.stringify(agendamento));
      return this.httpClient.post<Agendamento>(this.api, JSON.stringify(agendamento), this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }

    
    updateAgendamento(agendamento: Agendamento): Observable<Agendamento> {
      return this.httpClient.put<Agendamento>(this.api + '/' + agendamento.id, JSON.stringify(agendamento), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    }

    
    deleteAgendamento(agendamento: Agendamento) {
      return this.httpClient.delete<Agendamento>(this.api + '/' + agendamento.id, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    }
  
  createAgendamento() {
    return this.httpClient.get<Agendamento>(this.api )
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  
  
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      
      errorMessage = error.error.message;
      console.log(errorMessage, 'Client Error');
    } else {
      
      errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
      console.log(errorMessage, 'Server Error');
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
