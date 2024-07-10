export interface IRole {
  name: string;
}

export class Role implements IRole {
  name: string;
  constructor(name?: string) {
    this.name = name ?? '';
  }
}
