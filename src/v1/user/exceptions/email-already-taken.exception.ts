import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailAlreadyTakenException extends HttpException
{
    constructor() {
        super('Email already taken', HttpStatus.CONFLICT);
    }
}