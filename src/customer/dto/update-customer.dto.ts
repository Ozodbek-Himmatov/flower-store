export class UpdateCustomerDto {
    name?: string
    phone?: string
    email?: string
    // otp_id?: number
    hashed_password?: string
    hashed_refresh_token?: string
}
