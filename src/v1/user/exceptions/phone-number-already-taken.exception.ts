import { HttpException, HttpStatus } from "@nestjs/common";

export class PhoneNumberAlreadyTakenException extends HttpException
{
    constructor() {
        super('Phone number already taken', HttpStatus.CONFLICT);
    }
}