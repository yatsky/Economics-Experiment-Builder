// VariableType for PageElement
enum VariableType {
    StringVariable = "String Variable",
    IntegerVariable = "Integer Variable",
    CurrencyVariable = "Currency Variable",
    BooleanVariable = "Boolean Variable",
    // This is pure text
    PureText = "Text",
}

export enum WidgetType {
    VRadioSelect = "Vertical radio style selection button",
    HRadioSelect = "Horizontal radio style selection button",
    NoWidget = "No widget",
}

export type PageElementType = {
    pageElementId: string,
    selected: boolean,
    varType: VariableType,
    varName: string,
    varOwner: string,
    varLabel: string,
    varInitial: string | number,
    varMin: number,
    varMax: number,
    varText: string,
    varWidget: WidgetType,
    [key: string]: string | number | boolean,
};

// PageElement is the direct children of a page builder.
// PageElementSubElement is the direct children of a PageElement.
export type PageElementSubElementPropsType = {
    value: string | number,
    disabled: boolean,
}

export type PageBuilderType = {
    pbId: string,
    name: string,
    selected: boolean,
    data: PageElementType[],
};

export type HandleValChangePbPeFuncType = (pageElementId: number, val: VariableType | number | string, dataField: string) => void;
export type HandleValChangePeFuncType = (val: VariableType | number | string, dataField: string) => void;
export type HandleValChangeFuncType = (pageElementId: number, val: VariableType | number | string, dataField: string, pageName: string) => void;

export {VariableType};