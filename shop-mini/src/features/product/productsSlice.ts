import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types';

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchTerm: string;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  searchTerm: '',
};

const ASUS_DEMO_PRODUCTS: Omit<Product, 'id'>[] = [
  {
    title: 'ASUS Vivobook Go 14 (E1404F)',
    price: 22190000,
    category: 'ASUS Vivobook',
    image: '/anh1.png',
    description:
      'AMD Ryzen 5 7520U | RAM 16GB LPDDR5 | SSD 512GB | Màn hình 14" FHD NanoEdge | Thiết kế mỏng nhẹ chuẩn quân đội Mỹ STD-810H.',
  },
  {
    title: 'ASUS Zenbook S14 (UX5406) Copilot+ PC',
    price: 46990000,
    category: 'ASUS Zenbook',
    image: '/anh2.png',
    description:
      'Intel Core Ultra 9 (Series 2) | RAM 32GB | SSD 1TB | Màn hình 14" 3K OLED | Vỏ gốm Ceraluminum siêu mỏng 1.1cm, nặng 1.2kg.',
  },
  {
    title: 'ASUS Vivobook S16 (S3607) Copilot+ PC',
    price: 25890000,
    category: 'ASUS Vivobook',
    image: '/anh3.png',
    description:
      'Intel Core Ultra 7 | Đồ họa Intel UHD | RAM 16GB DDR5 | SSD 1TB PCIe 4.0 | Màn hình lớn 16" IPS tần số quét 144Hz.',
  },
  {
    title: 'ROG Zephyrus G16 (2026) GU606',
    price: 96990000,
    category: 'ROG Gaming',
    image: '/anh4.png',
    description:
      'Intel Core Ultra 9 | GPU NVIDIA GeForce RTX 5070 Ti | RAM 32GB | SSD 1TB PCIe 4.0 | Màn hình 16" 2.5K 240Hz OLED ROG Nebula.',
  },
];

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      return rejectWithValue('Không thể tải danh sách sản phẩm.');
    }
    const data = (await response.json()) as Product[];

    return data.slice(0, 4).map((item, index) => ({
      ...item,
      ...ASUS_DEMO_PRODUCTS[index],
      id: item.id,
    }));
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Lỗi kết nối mạng.');
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Lỗi không xác định';
      });
  },
});

export const { setSearchTerm } = productsSlice.actions;
export default productsSlice.reducer;