import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { InicioComponent } from '../inicio/inicio.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponentexport implements OnInit {
  items: string[] = ['Elemento 1', 'Elemento 2', 'Elemento 3'];
  selectedItems: string[] = [];

  constructor(private inicioComponent: InicioComponent) {}

  ngOnInit(): void {
    // Aquí puedes agregar cualquier lógica que necesites ejecutar cuando se inicializa el componente
  }

  selectItem(item: string): void {
    this.selectedItems.push(item);
  }

  onOk(): void {
    this.inicioComponent.showModal = false;
  }

  deleteSelectedItems(): void {
    this.items = this.items.filter(item => !this.selectedItems.includes(item));
    this.selectedItems = [];
    this.inicioComponent.showModal = false;
  }
}
