import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(
        protected readonly configService: ConfigService,
    ) {
        super({
            secretOrKey: configService.getOrThrow('JWT_SECRET'),
            jwtFromRequest: (req) => ExtractJwt.fromAuthHeaderAsBearerToken()(req)
        })
    }

    async validate(payload) {
        return payload;
    }
}
