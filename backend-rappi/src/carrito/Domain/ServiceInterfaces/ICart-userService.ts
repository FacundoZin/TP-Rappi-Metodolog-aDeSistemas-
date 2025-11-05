import { Cart } from 'src/carrito/Domain/entities/cart.entity';

export interface IUserCartService {
  addProductToCart(
    IdUser: string,
    productId: string,
    restaurantId: string,
    quantity: number,
  ): Promise<Cart>;
  removeProductFromCart(userId: string, productId: string): Promise<Cart>;
  IncremenQuantity(userId: string, productId: string): Promise<Cart>;
  DecrementQuantity(userId: string, productId: string): Promise<Cart>;
  getCartByUser(userId: string): Promise<Cart>;
}

// Token para inyección
export const USER_CART_SERVICE = Symbol('IUserCartService');
