import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

// import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    async findOneByHandle(handle: string) {
        return this.prismaService.user.findFirst({
            where: {
                handle: handle,
            },
        });
    }
    // async findOneByUuid(uuid: string, token: string) {
    //     const response = await axios.post(
    //         'https://api.particle.network/server/rpc',
    //         {
    //             jsonrpc: '2.0',
    //             id: 0,
    //             method: 'getUserInfo',
    //             params: [uuid, token],
    //         },
    //         {
    //             auth: {
    //                 username: process.env.PARTICLE_PROJECT_ID,
    //                 password: process.env.PARTICLE_SERVER_KEY,
    //             },
    //         },
    //     );
    //     const data = response.data;
    //     const particleuuid = data.result?.uuid;
    //     if (data.error || particleuuid === uuid) {
    //         throw new HttpException('Auth Error', HttpStatus.UNAUTHORIZED);
    //     }
    //     return this.prismaService.user.findFirst({
    //         where: {
    //             authuuid: uuid,
    //         },
    //     });
    // }
}
