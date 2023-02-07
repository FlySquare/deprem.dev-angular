export class Link{
  name: string;
  desc: string;
  link: string;

  prepare(input: any){
    Object.assign(this,input);
    return this;
  }
}
