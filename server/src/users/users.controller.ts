import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('handle/taken')
    async isHandleUnique(@Query('q') handle: string) {
        if (!handle) return false;

        console.log(handle);
        const isTaken = await this.usersService.findOneByHandle(handle);

        console.log({ isTaken });

        return !!isTaken;
    }
}
