export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_LOADING = 'SET_LOADING';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const SET_PAGE = 'SET_PAGE';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';

export interface Product {
  name: string;
  leadImage: { id: string };
  pricing: { customerPrice: { unitPrice: { value: number } } }; 
  manufacturer: { name: string };
 
}

interface Category {
 
}
interface FetchCategoriesSuccessAction {
    type: typeof FETCH_CATEGORIES_SUCCESS;
    payload: any; 
  }

export type ActionTypes =
  | SetProductsAction
  | SetCategoriesAction
  | SetSelectedCategoryAction
  | SetSearchTermAction
  | SetSearchResultsAction
  | SetLoadingAction
  | FetchCategoriesSuccessAction


interface SetProductsAction {
  type: typeof SET_PRODUCTS;
  payload: any[];
}

export interface RootState {
  products: Product[];
  loading: boolean;
  page: number;
}

export interface SetCategoriesAction {
  type: typeof SET_CATEGORIES;
  payload: Category[];
}

export interface SetSelectedCategoryAction {
  type: typeof SET_SELECTED_CATEGORY;
  payload: string | null;
}

export interface SetSearchTermAction {
  type: typeof SET_SEARCH_TERM;
  payload: string;
}

export interface SetSearchResultsAction {
  type: typeof SET_SEARCH_RESULTS;
  payload: Category[];
}

export interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}



