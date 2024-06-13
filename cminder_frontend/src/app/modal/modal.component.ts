import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { InicioComponent } from '../inicio/inicio.component';
import { Recordatorio } from '../recordatorio/recordatorio';
import { RecordatorioService} from '../recordatorio/recordatorio.service';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponentexport implements OnInit {
  recordatorios:Recordatorio[]=[];
  selectedItems: Recordatorio[] = [];

  constructor(private inicioComponent: InicioComponent, private recordatorioService: RecordatorioService) {}
  ngOnInit(): void {
    this.cargarRecordatorios();
  }
  
  cargarRecordatorios(): void {
    this.recordatorioService.obtenerActivos().subscribe(recordatorios => {
      this.recordatorios = recordatorios;
    });
  }
  


  selectItem(item: Recordatorio): void {
    this.selectedItems.push(item);
  }
  

  onOk(): void {
    this.inicioComponent.showModal = false;
  }

  deleteSelectedItems(): void {
    this.selectedItems.forEach(recordatorio => {
      if(recordatorio.id != undefined){
        this.recordatorioService.borrarRecordatorioPorId(recordatorio.id).subscribe(() => {
          console.log(`Recordatorio con id ${recordatorio.id} borrado exitosamente`);
        });
      }
      
    });
    this.selectedItems = [];
    this.inicioComponent.showModal = false;
  }
}
  


