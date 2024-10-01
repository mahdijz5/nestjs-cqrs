import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { LoginUserQuery } from "./login-user-query";
import { UserRepository } from "../../../user/db/user.repository";
import { LoginReqDto } from "src/user/dto";
import { LoginResDto } from "src/user/dto/login-res.dto";
import { comparePassword } from "../../../user/utils/hash.utils";
import { BadRequestException } from "@nestjs/common";
import { ERROR } from "../../../common/enums";
import { JwtService } from "@nestjs/jwt";
import { JwtDataInterface } from "../../../common/interfaces/jwt-interface";

@QueryHandler(LoginUserQuery)
export class LoginUserHandler implements IQueryHandler<LoginUserQuery> {
    constructor(private readonly userRepository: UserRepository, private jwtService: JwtService) { }

    async execute({ loginReqDto }: LoginUserQuery): Promise<LoginResDto> {
        const user = await this.userRepository.findOneByCondition({
            username: loginReqDto.username
        })
        if (!user) throw new BadRequestException(ERROR.INVALID_CREDENTIALS)

        const isPasswordMatched = await comparePassword(loginReqDto.password, user.getPassword)

        if (!isPasswordMatched) throw new BadRequestException(ERROR.INVALID_CREDENTIALS)
        const token = await this.signToken({ id: user.getID, username: user.getUsername })

        return {
            token
        }
    }

    private async signToken(jwtData: JwtDataInterface) {
        const token = this.jwtService.sign({ ...jwtData });
        return token;
    }

}