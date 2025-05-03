// Types for Lark Base (Bitable) record API

// Request parameters for listing records
export type ListBaseRecordsParams = {
  appToken: string; // App token for the Base app
  tableId: string; // Table ID within the Base app
  viewId?: string; // Optional: View ID to filter records
  pageSize?: number; // Optional: Number of records per page (default: 500, max: 500)
  pageToken?: string; // Optional: Token for pagination
  filter?: string; // Optional: Filter expression
  sort?: string[]; // Optional: Array of sort strings, e.g. ["fieldName1 DESC"]
  fieldNames?: string[]; // Optional: Array of field names to return
  textFieldAsArray?: boolean; // Optional: Whether to return text fields as arrays
  userIdType?: "open_id" | "union_id" | "user_id"; // Optional: User ID type
  displayFormulaRef?: boolean; // Optional: Whether to return formula/lookup original values
  automaticFields?: boolean; // Optional: Whether to return auto fields (created_by, etc.)
};

// A single Base record
export type Person = {
  id: string;
  name?: string;
  en_name?: string;
  email?: string;
  avatar_url?: string;
};

export type BaseRecord = {
  record_id: string;
  fields: Record<string, unknown>; // Field name to value mapping
  created_by?: Person;
  created_time?: number;
  last_modified_by?: Person;
  last_modified_time?: number;
};

// Response structure for listing records
export type ListBaseRecordsResponse = {
  code: number;
  msg: string;
  data: {
    items: BaseRecord[];
    page_token?: string;
    has_more?: boolean;
    total?: number;
  };
};
