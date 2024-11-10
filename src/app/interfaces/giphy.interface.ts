export interface GiphyResponse {
    data: GiphyData[];
    meta: Meta;
  }
  
  export interface GiphyData {
    type: string;
    id: string;
    url: string;
    images: Images;
  }
  
  export interface Images {
    original: Original;
  }
  
  export interface Original {
    url: string;
  }
  
  export interface Meta {
    status: number;
    msg: string;
  }
  