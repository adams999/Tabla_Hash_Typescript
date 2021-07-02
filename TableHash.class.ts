export class ListaEnlazada {
  private head: any = null;

  empty(): boolean {
    if (this.head) return false;
    return true;
  }

  last(): listJS {
    let dummy: listJS = this.head;
    while (dummy.getNext()) {
      dummy = dummy.getNext();
    }
    return dummy;
  }

  find(key: string): any {
    let dummy: listJS = this.head;
    while (dummy) {
      if (dummy.getKey() == key) return dummy.value();
      dummy = dummy.getNext();
    }
    return false;
  }

  insert(value: any, key: string): void {
    let node: listJS = new listJS(value, key);
    if (!this.head) this.head = node;
    else this.last().next(node);
  }

  print(): void {
    let dummy: listJS = this.head;
    while (dummy) {
      console.log(dummy.value() + " ");
      dummy = dummy.getNext();
    }
  }
}

//node
class listJS {
  private val: any;
  private key: string;
  private nextNode: any;

  constructor(value: any, key: string) {
    this.nextNode = null;
    this.key = key;
    this.val = value;
  }

  getNext(): listJS {
    return this.nextNode;
  }

  next(node: listJS) {
    this.nextNode = node;
  }
  
  getKey(): string {
    return this.key;
  }

  value(): any {
    return this.val;
  }
}

export class HashTabla {
  private size: number;
  private table: ListaEnlazada[];

  constructor(size: number) {
    this.size = size;
    this.table = [];
    for (let i = 0; i < size; i++) {
      this.table[i] = new ListaEnlazada();
    }
  }

  private hash = (key: string): string => {
    let id: number = 0;
    for (let i = 0; i < key.length; i++) {
      id += key.charCodeAt(i) * 100 - key.charCodeAt(i - 1 < 0 ? 0 : i - 1);
    }
    return String(id % this.size);
  };

  insert(key: string, value: any) {
    let id: string = this.hash(key);
    const bucket: ListaEnlazada = this.table[id];

    bucket.insert(value, key);
  }

  getKey(key: string) {
    let id = this.hash(key);
    const bucket: ListaEnlazada = this.table[id];

    if (!bucket.empty()) {
      let value: any = bucket.find(key);
      if (value) return value;
    }
    return "No se Encontro el Registro";
  }

  print(): void {
    console.log(this.table);
  }
}

let hash = new HashTabla(5); // se asigna las posiciones a de dicha tabla de hash
hash.insert("Nombre", 123132);

console.log(hash.getKey("Nombre"));
hash.insert("Apellido", 2123123);
hash.insert("Apellidos", 2123123);
hash.insert("Apellidoas", 2123123);
hash.insert("Apelli", 2123122);
console.log(hash.getKey("Apellido"));
console.log(hash.print());
