import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/carrito/Domain/entities/cart-item.entity';
import { Cart } from 'src/carrito/Domain/entities/cart.entity';
import { IUserCartService } from 'src/carrito/Domain/ServiceInterfaces/ICart-userService';
import { ProductAdapter } from 'src/restaurants/Infraestructure/Adapters/product-adapter';
import { Repository } from 'typeorm';

Injectable();
export class UserCartService implements IUserCartService {
  constructor(
    @InjectRepository(Cart)
    private readonly CartRepo: Repository<Cart>,

    @InjectRepository(CartItem)
    private readonly CartItemRepo: Repository<CartItem>,

    private readonly productAdapter: ProductAdapter,
  ) {}

  async getCartByUser(userId: string): Promise<Cart> {
    const cart = await this.CartRepo.findOne({
      where: { userId },
      relations: ['items'],
    });

    if (!cart) {
      throw new NotFoundException('Carrito no encontrado');
    }

    return cart;
  }

  private async CreateCart(
    IdUser: string,
    restaurantId: string,
  ): Promise<Cart> {
    const cart = this.CartRepo.create({
      userId: IdUser,
      total: 0,
      restaurantId: restaurantId ?? null,
    });
    const cartCreated = await this.CartRepo.save(cart);

    return cartCreated;
  }

  async addProductToCart(
    IdUser: string,
    productId: string,
    restaurantId: string,
    quantity: number,
  ): Promise<Cart> {
    let cart = await this.CartRepo.findOne({ where: { userId: IdUser } });

    if (!cart) {
      cart = await this.CreateCart(IdUser, restaurantId);
    }

    const productInfo = await this.productAdapter.ProvideInfoToCart(productId);

    if (!productInfo) {
      throw new Error('No se pudo obtener la información del producto');
    }

    if (!cart.items) {
      cart.items = [];
    }

    const newItem: CartItem = {
      cart: cart,
      productId: productId,
      productName: productInfo.name,
      productPrice: productInfo.price,
      quantity: quantity,
    };

    cart.items.push(newItem);

    cart.total += Number(productInfo.price) * quantity;

    await this.CartRepo.save(cart);

    return cart;
  }

  async removeProductFromCart(
    userId: string,
    productId: string,
  ): Promise<Cart> {
    const cart = await this.CartRepo.findOne({
      where: { userId },
      relations: ['items'],
    });

    if (!cart) throw new NotFoundException('Carrito no encontrado');

    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId,
    );
    if (itemIndex === -1)
      throw new NotFoundException('Producto no encontrado en el carrito');

    const [removedItem] = cart.items.splice(itemIndex, 1);

    // Recalcular total
    cart.total -= Number(removedItem.productPrice) * removedItem.quantity;
    if (cart.total < 0) cart.total = 0;

    await this.CartRepo.save(cart);
    await this.CartItemRepo.delete({ id: removedItem.id });

    return cart;
  }

  async IncremenQuantity(userId: string, productId: string): Promise<Cart> {
    const cart = await this.CartRepo.findOne({
      where: { userId },
      relations: ['items'],
    });

    if (!cart) throw new NotFoundException('Carrito no encontrado');

    const item = cart.items.find((i) => i.productId === productId);
    if (!item)
      throw new NotFoundException('Producto no encontrado en el carrito');

    item.quantity += 1;
    cart.total = cart.items.reduce(
      (sum, i) => sum + Number(i.productPrice) * i.quantity,
      0,
    );

    await this.CartRepo.save(cart);
    return cart;
  }

  async DecrementQuantity(userId: string, productId: string): Promise<Cart> {
    const cart = await this.CartRepo.findOne({
      where: { userId },
      relations: ['items'],
    });

    if (!cart) throw new NotFoundException('Carrito no encontrado');

    const item = cart.items.find((i) => i.productId === productId);
    if (!item)
      throw new NotFoundException('Producto no encontrado en el carrito');

    item.quantity -= 1;

    if (item.quantity == 0) {
      const cartUpdated = await this.removeProductFromCart(userId, productId);
      return cartUpdated;
    }

    // Recalcular total
    cart.total = cart.items.reduce(
      (sum, i) => sum + Number(i.productPrice) * i.quantity,
      0,
    );

    await this.CartRepo.save(cart);
    return cart;
  }
}
