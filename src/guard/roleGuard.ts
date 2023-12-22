import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.get<string[]>('roles', context.getHandler())
		if (!roles) {
			return true // No role specified, allow access by default
		}

		const request = context.switchToHttp().getRequest()
		const user = request.user // Assuming you have a user object in your request after authentication

		// Check if the user has the required role
		return roles.includes(user.role)
	}
}
