import TypeBatis from "index";

/**
 * @author Taegyun, K <dev@balsa.to>
 *
 * "PoolSchemes" are managed globally in "TypeBatis Namespace".
 *
 * This object serves to mapping entities by sync with user schema (e.g. pg_stat_user_*) of the postgresql DBMS.
 *
 * defs:
 * TypeBatis.Decorators.ITable[]
 *
 * set:
 * Set new or overwrite ITable
 *
 * patch:
 * Update exist ITable scheme
 *
 * get:
 * Get ITable scheme
 *
 * delete:
 * Delete exist ITable scheme
 *
 * exist:
 * Check exist ITable scheme
 *
 *  */
export const PoolSchemes =
{
  defs: [],

  set: (table: TypeBatis.Decorators.ITable) =>
  {
    if (table.id && TypeBatis.TableSchemes.exist(table.id))
    {
      TypeBatis.TableSchemes.delete(table.id);
    }
    else if (table.name && TypeBatis.TableSchemes.exist(table.name))
    {
      TypeBatis.TableSchemes.delete(table.name);
    }

    TypeBatis.TableSchemes.defs.push(table);
  },

  patch: (tableNameOrId: string | number, table: typeof TypeBatis.Decorators.ITable) =>
  {
    TypeBatis.TableSchemes.defs.filter(v => typeof tableNameOrId === "string" ? (v.name == tableNameOrId) : (v.id == tableNameOrId)).map((v, i) =>
    {
      TypeBatis.TableSchemes.defs[ i ] = { ...v, ...table };
    });
  },

  get: (tableNameOrId: string | number): TypeBatis.Decorators.ITable =>
  {
    return TypeBatis.TableSchemes.defs.find(v => typeof tableNameOrId === "string" ? (v.name == tableNameOrId) : (v.id == tableNameOrId));
  },

  list: (): TypeBatis.Decorators.ITable[] =>
  {
    return TypeBatis.TableSchemes.defs;
  },

  delete: (tableNameOrId: string | number) =>
  {
    TypeBatis.TableSchemes.defs.filter(v => typeof tableNameOrId === "string" ? (v.name == tableNameOrId) : (v.id == tableNameOrId)).map((_v, i) => TypeBatis.TableSchemes.defs.splice(i));
  },

  exist: (tableNameOrId: string | number): boolean =>
  {
    return TypeBatis.TableSchemes.defs.filter(v => typeof tableNameOrId === "string" ? (v.name == tableNameOrId) : (v.id == tableNameOrId)).length > 0;
  }
}

export interface Column
{
  id: number | null;
  propertyName: string;
  name: string;
  type: string;
  length: number | null;
  allowNull: boolean;
  default: any | null;
}

export interface KeyProperty
{
  tableId: Table;
  columnName: string;
  destTableId: Table;
  destColumnName: string;
}

export interface Key
{
  property: KeyProperty[];
  key?: string;
}

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