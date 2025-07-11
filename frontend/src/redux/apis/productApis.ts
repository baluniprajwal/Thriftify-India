import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    condition: string;
    category: string;
    material: string;
    careInstructions: string[];
    shippingInfo: string;
    imageUrls: string[];
}
  
export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
      credentials: 'include', 
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        searchProducts: builder.query<Product[], Record<string, string | number>>({
            query: (params) => ({
              url: `search`, 
              params,
            }),
        }),
        getAllProducts: builder.query<Product[], void>({
            query: () => '',
            providesTags: ['Product'],
        }),
        getProductById: builder.query<Product, string>({
            query: (id) => `${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
    })
});
  
export const {
    useSearchProductsQuery,
    useGetAllProductsQuery,
    useGetProductByIdQuery,
  } = productApi;