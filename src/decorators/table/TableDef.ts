// Default sort = ASC
export type TableOrder = { columnName: string, sort?: "ASC" | "DESC" }

export interface ITable
{
  id: number;
  destClass: any;
  className: string;
  nameSpace: string;
  name: string;
  columns: Column[];
  primaryKeys: Key[];
  foreignKeys: Key[];
  uniqueKeys: Key[];
  rows: number;
}

export class Table implements ITable
{
  id: number;
  destClass: any;
  className: string;
  nameSpace: string;
  name: string;
  columns: Column[];
  primaryKeys: Key[];
  foreignKeys: Key[];
  uniqueKeys: Key[];
  rows: number;

  constructor (options?: TypeBatis.TypeDefs.ModelOptions)
  {
    this.init();

    if (options)
    {
      this.destClass = options.destClass ?? undefined;
      this.className = options.className ?? options.destClass.name ?? undefined;
      this.name = (options.name ?? this.className)?.toLowerCase();
    }
  }

  public init = () =>
  {
    this.id = 0;
    this.nameSpace = "";
    this.columns = [];
    this.primaryKeys = [];
    this.foreignKeys = [];
    this.uniqueKeys = [];
    this.rows = 0;
  }
}