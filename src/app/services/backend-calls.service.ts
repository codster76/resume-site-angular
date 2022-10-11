import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../model/data-model';

@Injectable({
  providedIn: 'root'
})
export class BackendCallsService {

  // const APIUrl = 'http://localhost:5000/api/items';
  APIUrl = 'https://resume-site-backend.herokuapp.com/api/items';

  constructor(private http: HttpClient) { }

  // Get items
  // async getItemList() {
  getItemList() {
    return this.http.get<Item[]>(this.APIUrl);
    // const res = await fetch(this.APIUrl);
    // const items = await res.json();

    // return items as Promise<Item[]>;
  }

  // Update item
  async updateItem(itemToReplaceWith: Item, IDOfItemToReplace: string) {
    const header = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...itemToReplaceWith }),
    };
    const response = await fetch(`${this.APIUrl}/${IDOfItemToReplace}`, header);
    const data = await response.json();
    console.log(`Item Updated: ${data}`);
  }

  async addItem(itemToAdd: Item) {
    const header = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...itemToAdd }),
    };
    const response = await fetch(`${this.APIUrl}`, header);
    const data = await response.json();
    console.log(`Item Added: ${data}`);
  }

  async deleteItem(idToDelete: string) {
    const header = {
      method: 'DELETE',
    };
    const response = await fetch(`${this.APIUrl}/${idToDelete}`, header);
    const data = await response.json();
    console.log(`Item Deleted: ${data}`);
  }
}
