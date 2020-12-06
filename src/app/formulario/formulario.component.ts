import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Agendamento } from '../agendamento';
import { AgendamentoService } from '../agendamento.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  // Fazendo o envio através do formulário
  agendamento = {} as Agendamento;
  agendamentos: Agendamento[];
  
  // Chamadas http
  constructor(private agendamentoService: AgendamentoService) { }

  ngOnInit(): void {
  }

  // Recebendo o formulário e fazendo uma requisição no agendamento.service
  // Salva e limpa o formulário
  // defini se um carro será criado ou atualizado
  saveAgendamento(form: NgForm) {
    if (this.agendamento.id !== undefined) {
      this.agendamentoService.updateAgendamento(this.agendamento).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.agendamentoService.saveAgendamento(this.agendamento).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

     // Chama o serviço para obter todos os agendamentos
     getAgendamentos() {
      this.agendamentoService.getAgendamentos().subscribe((agendamentos: Agendamento[]) => {
        this.agendamentos = agendamentos;
      });
    }

    // Deleta um agendamento
    deleteAgendamento(agendamento: Agendamento) {
      this.agendamentoService.deleteAgendamento(agendamento).subscribe(() => {
        this.getAgendamentos();
      });
    }

    // Copia o agendamento para ser editado.
    editAgendamento(agendamento: Agendamento) {
      this.agendamento = { ...agendamento };
    }
  
    // Reseta o formulario
    cleanForm(form: NgForm) {  
      form.resetForm();
      this.agendamento = {} as Agendamento;      
    }

}