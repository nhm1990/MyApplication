export interface IDocument {
    id?: number;
    name: string;
    filePath: string;
    verificationCode: string;
  }
  
export class Document implements IDocument {
    constructor(
        public id: number,
        public name: string,
        public filePath: string,
        public verificationCode: string
    ) {
        this.id = id;
        this.name = name;
        this.filePath = filePath;
        this.verificationCode = verificationCode;
    }
}

