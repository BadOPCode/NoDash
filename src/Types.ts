export type JsonProperty = string | number | boolean | null | JsonArray | JsonObject;
export type JsonArray = JsonProperty[];
export interface JsonObject {
    [key: string]: JsonProperty;
}
