export interface IRoles {
  name: string;
}

export class Roles implements IRoles {
  name: string;
  constructor(name?: string) {
    this.name = name ?? '';
  }
}
