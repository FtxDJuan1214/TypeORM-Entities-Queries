import { 
    BaseEntity,
    PrimaryGeneratedColumn,
    Entity,
    Column,
    ManyToOne,
    OneToMany
} from "typeorm"


@Entity()
export class Store extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({
        type: `text`
    })
    description: string

    @ManyToOne( () => Store, (store)=> store.childStores)
    parentStore: Store

    @OneToMany( () => Store, (store) => store.parentStore)
    childStores: Store[]

}