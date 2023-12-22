import { Base } from 'src/base/base'
import { Column, Entity } from 'typeorm'

@Entity()
export class UserEntity extends Base {
	@Column({ default: '' })
	username: string

	@Column({ unique: true })
	email: string

	@Column({ select: false })
	password: string

	@Column({ default: false, name: 'is_admin' })
	isAdmin: boolean
}
