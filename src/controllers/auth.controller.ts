import { Controller, Get, Post, Body, Query, HttpCode, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateAlarmDto } from '../dto/update-alarm.dto';

@Controller()
export class AuthController {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    @Post('auth')
    async auth(@Body() createUserDto: CreateUserDto): Promise<User> {
        const { name, email } = createUserDto;
        let user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            user = this.userRepository.create({ name, email });
            await this.userRepository.save(user);
        }
        return user;
    }

    @Post('alarm')
    @HttpCode(200)
    async updateAlarm(@Body() updateAlarmDto: UpdateAlarmDto): Promise<User> {
        const { email, time } = updateAlarmDto;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        user.alarm = time;
        await this.userRepository.save(user);
        return user;
    }

    @Get('alarm')
    async getAlarm(@Query('email') email: string): Promise<{ alarm: string | null }> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return { alarm: user.alarm };
    }
}
