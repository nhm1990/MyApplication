export interface IDocument {
    id?: number;
    companyName: string;
    name: string;
    filePath: string;
    verificationCode: string;
  }
  
export class Document implements IDocument {
    constructor(
        public id: number,
        public companyName: string,
        public name: string,
        public filePath: string,
        public verificationCode: string
    ) {
        this.id = id;
        this.companyName = companyName;
        this.name = name;
        this.filePath = filePath;
        this.verificationCode = verificationCode;
    }
}

