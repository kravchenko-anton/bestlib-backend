import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import {
	HealthCheck,
	HealthCheckService,
	HttpHealthIndicator
} from '@nestjs/terminus'

@Controller('health')
@ApiTags('❤️ health')
export class HealthController {
	constructor(
		private health: HealthCheckService,
		private http: HttpHealthIndicator
	) {}

	@Get()
	@ApiOkResponse({ description: 'Health check', type: Object })
	@HealthCheck()
	check() {
		return this.health.check([
			() => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com')
		])
	}
}
