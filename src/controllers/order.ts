import { Body, Post, Route, Tags } from 'tsoa';
import { createOrder, ICreateOrderPayload } from '../repositories/order';
import { DomainError } from '../utils/exceptions';
import { Order } from '../entities/orders';
import { getByReference } from '../repositories/merchant';

@Route('api/orders')
@Tags('Order')
export default class OrderController {
  @Post('/')
  public async createOrder(@Body() body: ICreateOrderPayload): Promise<Order> {
    const merchant = await getByReference(body.merchantReference);
    if (!merchant) {
      throw new DomainError('Invalid Merchant!');
    }

    return createOrder(body);
  }
}
