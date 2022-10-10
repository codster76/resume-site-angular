import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modals: any[] = [];

  add(modal: any) {
    this.modals.push(modal);
  }

  remove(id: string) {
    this.modals = this.modals.filter((modal) => {
      if (modal.id !== id) {
        return modal;
      }
    });
  }

  open(id: string) {
    const modalToOpen = this.modals.find((modal) => {
      if (modal.id === id) {
        return modal;
      }
    });
    modalToOpen.openModal();
  }

  close(id: string) {
    const modalToClose = this.modals.find((modal) => {
      if (modal.id === id) {
        return modal;
      }
    });
    modalToClose.closeModal();
  }

  constructor() {}
}
