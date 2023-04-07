import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class ActiveAdminGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        if (!authHeader)
            throw new UnauthorizedException({
                message: "The User is NOT Authorized (no Auth in ExecContext)",
            });
        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException({
                message: "The User is NOT Authorized  (empty bearer or token)",
            });
        }
        let user: any;
        try {
            user = this.jwtService.verify(token, { secret: process.env.PRIVATE_KEY });
        } catch (error) {
            console.log(error);

            throw new UnauthorizedException({
                message: "The User is NOT Authorized (Error while Verifying)",
            });
        }


        console.log(req, "salom");


        if (!user.is_active) {
            throw new UnauthorizedException({
                message: "Admin is NOT Active"
            })
        }

        return true
    }
}