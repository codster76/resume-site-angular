import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../model/data-model';

@Injectable({
  providedIn: 'root'
})
export class BackendCallsService {

  APIUrl = 'http://localhost:5000/api';
  // APIUrl = 'https://resume-site-backend.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  // Get items
  getItemList(bagName: string, bagPassword: string) {
    return this.http.get<Item[]>(`${this.APIUrl}/items/${bagName}/${bagPassword}`);
  }

  // Update item
  async updateItem(bagName: string, bagPassword: string, itemToReplaceWith: Item) {
    const header = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemToReplaceWith),
    };
    const response = await fetch(`${this.APIUrl}/items/${bagName}/${bagPassword}`, header);
    const data = await response.json();
    console.log(`Item Updated: ${data}`);
  }

  async addItem(bagName: string, bagPassword: string, itemToAdd: Item) {
    const header = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...itemToAdd }),
    };
    const response = await fetch(`${this.APIUrl}/items/${bagName}/${bagPassword}`, header);
    const data = await response.json();
    return data;
  }

  async deleteItem(bagName: string, bagPassword: string, idToDelete: string) {
    const header = {
      method: 'DELETE',
    };
    const response = await fetch(`${this.APIUrl}/items/${bagName}/${bagPassword}/${idToDelete}`, header);
    const data = await response.json();
    console.log(`Item Deleted: ${data}`);
  }

  getAutocomplete(textInput: string, numberOfResults: number) {
    return this.http.get<string[]>(`${this.APIUrl}/autocomplete/${textInput}/${numberOfResults}`);
  }
}
