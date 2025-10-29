export interface IVendorProvider {
  ProvideVendorEmail(idRestaurant: string): Promise<string>;
}
