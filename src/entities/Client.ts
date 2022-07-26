import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BaseEntity
} from "typeorm";

@Entity()
export class Client extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: number
    
    @Column()    
    firstName: string
    
    @Column()
    lastName: string
    
    @Column({unique: true})
    email: string
}