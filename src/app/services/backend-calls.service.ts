import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../model/data-model';

@Injectable({
  providedIn: 'root'
})
export class BackendCallsService {

  // APIUrl = 'http://localhost:5000/api/items';
  APIUrl = 'https://resume-site-backend.herokuapp.com/api/items';

  constructor(private http: HttpClient) { }

  // Get items
  getItemList() {
    return this.http.get<Item[]>(this.APIUrl);
  }

  // Update item
  async updateItem(itemToReplaceWith: Item, IDOfItemToReplace: string) {
    // Because JSON.stringify converts numbers to strings and zod in the backend can't read the numbers when they're strings, I have to build my own JSON to send.
    const stringToSend = 
    `{
      "id":"${itemToReplaceWith.id}",
      "name":"${itemToReplaceWith.name}",
      "description":"${itemToReplaceWith.description}",
      "value":${itemToReplaceWith.value},
      "weight":${itemToReplaceWith.weight},
      "quantity":${itemToReplaceWith.quantity}
    }`;
    console.log(stringToSend);
    const header = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: stringToSend,
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
