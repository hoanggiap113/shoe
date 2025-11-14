export interface orderFilter{
    customerName?:string,
    phone?:string,
    statusCode?:number,
    totalPriceFrom?:number,
    totalPriceTo?:number,
    district?:string
    city?:string,
    address?:string

    orderDate?:Date,
}