export class Location{
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  google_maps_url: string;

  prepare(input: any){
    Object.assign(this,input);
    return this;
  }
}
