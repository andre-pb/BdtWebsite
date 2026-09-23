// Public catalogue shared with the independently deployed shop API.
import catalog from "../../../api/src/lib/shop-catalog.json";

export const PRINTFUL_CATALOG_HEX_IDS: Record<string, Record<string, string>> = catalog.printful;
