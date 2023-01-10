import { TableOrder } from "./TableDef";

export function Table(tableName: string): any;
export function Table(columnName: string, order: TableOrder[] | TableOrder): any;
export function Table(columnName: any, order?: any[] | any): any
{
  return function <T = any>(target: T, targetName: string)
  {
    // TypeBatis.TableSchemes.post(new TypeBatis.Entity.Table({ className: targetName, destClass: target, name: tableName }));
  }
};