// import {Reducer} from 'redux';

export interface ProductType {
  id: number;
  name?: string;
}

export interface ProductsModelType {
  namespace: string;
  state: Array<ProductType>;
}

const Model: ProductsModelType = {
  namespace: 'products',

  state: [
    {id: 1, name: 'product 1'},
    {id: 2, name: 'product 2'},
  ],
};

export default Model
