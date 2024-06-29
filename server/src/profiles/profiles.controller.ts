import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from 'src/users/users.service';

@Controller('profiles')
export class ProfilesController {
    constructor(
        private readonly profilesService: ProfilesService,
        private readonly usersService: UsersService,
    ) {}

    @Post()
    update(
        @Body('uuid') uuid: string,
        @Body('token') token: string,
        @Body('theme') theme: string,
        @Body('background') background: string,
    ) {
        return this.profilesService.update(uuid, token, theme, background);
    }
}
