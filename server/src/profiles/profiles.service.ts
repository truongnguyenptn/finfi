import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class ProfilesService {
    constructor(private readonly prismaService: PrismaService) {}

    create(createProfileDto: CreateProfileDto) {
        return 'This action adds a new profile';
    }

    findAll() {
        return `This action returns all profiles`;
    }

    findOne(id: number) {
        return `This action returns a #${id} profile`;
    }

    async update(
        uuid: string,
        token: string,
        theme: string,
        background: string,
    ) {
        // const response = await axios.post(
        //     'https://api.particle.network/server/rpc',
        //     {
        //         jsonrpc: '2.0',
        //         id: 0,
        //         method: 'getUserInfo',
        //         params: [uuid, token],
        //     },
        //     {
        //         auth: {
        //             username: process.env.PARTICLE_PROJECT_ID,
        //             password: process.env.PARTICLE_SERVER_KEY,
        //         },
        //     },
        // );

        // const data = response.data;
        // const particleuuid = data.result?.uuid;
        // console.log(data)
        
        // if (data.error || particleuuid !== uuid) {
        //     throw new HttpException('Auth Error', HttpStatus.UNAUTHORIZED);
        // }

        const user = await this.prismaService.user.findFirst({
            where: {
                authuuid: uuid,
            },
            include: {
                Profile: true,
            },
        });
        console.log(user)
        await this.prismaService.profile.update({
            where: {
                id: user.Profile[0].id,
            },
            data: {
                theme,
                background,
            },
        });

        return this.prismaService.user.findFirst({
            where: {
                id: user.id,
            },
            include: {
                Profile: true,
                Social: true,
                Wallet: true,
            },
        });
    }
}
