/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export interface Artist {
  id: string;
  name: string;
  genre: string;
  image: string;
  day: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  LINEUP = 'lineup',
  EXPERIENCE = 'experience',
  TICKETS = 'tickets',
}

export interface KulinerItem {
  id: number;
  title: string;
  image: string;
  description: string;
  products: string;
  address: string;
  whatsapp: string;
}
