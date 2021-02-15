export interface IDocument {
    id?: number;
    name: string;
    imgPath: string;
    verificationCode: string;
  }
  
export class Document implements IDocument {
    constructor(
        public id: number,
        public name: string,
        public imgPath: string,
        public verificationCode: string
    ) {
        this.id = id;
        this.name = name;
        this.imgPath = imgPath;
        this.verificationCode = verificationCode;
    }
}

