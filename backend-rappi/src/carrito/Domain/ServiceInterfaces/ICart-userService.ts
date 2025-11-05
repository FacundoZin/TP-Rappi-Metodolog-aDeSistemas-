import { AddItemToCartDto } from 'src/carrito/Application/dto/Input/AddItemToCart';
import { Cart } from 'src/carrito/Domain/entities/cart.entity';

export interface IUserCartService {
  addProductToCart(IdUser: string, dto: AddItemToCartDto): Promise<Cart>;
  removeProductFromCart(userId: string, productId: string): Promise<Cart>;
  UpdateProductQuantity(
    userId: string,
    productId: string,
    newQuantity: number,
  ): Promise<Cart>;
  getCartByUser(userId: string): Promise<Cart>;
}

// Token para inyección
export const USER_CART_SERVICE = Symbol('IUserCartService');
