export class SearchRestaurantQueryObject {
  name?: string;
  category?: string;
  city?: string;

  public hasExactlyOneFilter(): boolean {
    const definedFilters = Object.values(this).filter(
      (value) => value !== undefined && value !== null,
    );

    return definedFilters.length === 1;
  }
}
