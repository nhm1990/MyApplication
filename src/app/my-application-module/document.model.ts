export interface IDocument {
    id?: number;
    name: string;
    imgPath: string;
  }
  
export class Document implements IDocument {
    constructor(
        public id: number,
        public name: string,
        public imgPath: string,
    ) {
        this.id = id;
        this.name = name;
        this.imgPath = imgPath;
    }
}