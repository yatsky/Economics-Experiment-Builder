const drawerWidth = 140;

// VariableType for PageElement
enum VariableType {
    StringVariable = "String Variable",
    IntegerVariable = "Integer Variable",
    CurrencyVariable = "Currency Variable",
    BooleanVariable = "Boolean Variable",
    // This is pure text
    PureText = "Text",
}

export type PageElementDataType = {
    pageElementId: number,
    varType: VariableType,
    varName: string,
    varOwner?: string,
    varLabel: string,
    varInitial: string | number,
    varMin?: number,
    varMax?: number,
    varText?: string,
};

export type PageBuilderType = {
    name: string,
    selected: boolean,
    data: PageElementDataType[],
};

export type HandleValChangePbPeFuncType = (pageElementId: number, val: VariableType | number | string, dataField: string) => void;
export type HandleValChangePeFuncType = (val: VariableType | number | string, dataField: string) => void;
export type HandleValChangeFuncType = (pageElementId: number, val: VariableType | number | string, dataField: string, pageName: string) => void;

export {drawerWidth, VariableType};