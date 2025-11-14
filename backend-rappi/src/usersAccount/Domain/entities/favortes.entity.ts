import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'favorites' })
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  @JoinColumn({ name: 'userId' })
  userId: string;

  @Column({ type: 'uuid' })
  restaurantId: string;
}
