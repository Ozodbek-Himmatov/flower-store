export class CreateDeliveryAddressDto {
    name: string
    country_id: number
    region_id: number
    district_id: number
    street: string
    house: string
    flat: number
    more_into?: string
}
