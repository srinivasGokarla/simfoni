// store.ts

import { createStore, applyMiddleware } from 'redux';

import { ActionTypes, SET_CATEGORIES, SET_PRODUCTS,SET_PAGE, FETCH_PRODUCTS_SUCCESS,SET_LOADING, SetSearchTermAction, SetSearchResultsAction,SET_SELECTED_CATEGORY,SET_SEARCH_TERM,SET_SEARCH_RESULTS,FETCH_CATEGORIES_SUCCESS, } from './ActionTypes';



interface Category {

}

interface State {
  products: Product[];
  categories: Category[];
  selectedCategoryId: string | null;
  searchTerm: string;
  searchResults: Category[];
  loading: boolean;
  data : any[],
  page : number
  
}
interface SetCategoriesAction {
  type: typeof SET_CATEGORIES;
  payload: Category[];
}

const initialState: State = {
  products: [],
  categories: [],
  selectedCategoryId: null,
  searchTerm: '',
  searchResults: [],
  loading: false,
  data : [],
  page : 1
  
};
export interface Product {
  url: string;
  name: string;
  leadImage: { id: string };
  pricing: { customerPrice: { unitPrice: { value: number } } };
  manufacturer: { name: string };
 
}


export const setProducts = (products: any[]) => ({
    type: SET_PRODUCTS,
    payload: products,
  });

  export const setLoading = (isLoading: boolean) => ({
    type: SET_LOADING,
    payload: isLoading,
  });

export const setCategories = (categories: Category[]): SetCategoriesAction => ({
  type: SET_CATEGORIES,
  payload: categories,
});



export const setSearchTerm = (term: string): SetSearchTermAction => ({
  type: SET_SEARCH_TERM,
  payload: term,
});

export const setSearchResults = (results: Category[]): SetSearchResultsAction => ({
  type: SET_SEARCH_RESULTS,
  payload: results,
});
export const setPage = (page: number) => ({
    type: SET_PAGE,
    payload: page,
  });
  
  export const fetchProductsSuccess = (products: any[]) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
  });
  export const fetchCategoriesSuccess = (data: any[])  => ({
    type: FETCH_CATEGORIES_SUCCESS,
    payload: data,
  });
  export const setSelectedCategory = (categoryId: string | null) => ({
    type: SET_SELECTED_CATEGORY,
    payload: categoryId,
  });
   export interface RootState {
    selectedCategoryId: string | null;
    products: Product[];
  loading: boolean;
  page: number;
  }
  
 
 


const reducer = (state = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case SET_SELECTED_CATEGORY:
      return { ...state, selectedCategoryId: action.payload };
    case SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    case SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
      case FETCH_CATEGORIES_SUCCESS:
        return {
            ...state,
            categories: action.payload,
          };
          case SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategoryId: action.payload,
      };
    default:
      return state;
  }
};

export type SetProductsAction = ReturnType<typeof setProducts>;
export type SetLoadingAction = ReturnType<typeof setLoading>;

interface Dispatch {
  (action: ActionTypes): void;
}
const store = createStore(reducer, applyMiddleware());

  
  export default store;
