import { Base } from 'src/base/base'
import { Entity } from 'typeorm'

@Entity()
export class ImageEntity extends Base {
	image: string
}
