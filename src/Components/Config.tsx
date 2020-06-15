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
    varType: VariableType,
    varName: string,
    varOwner?: string,
    varLabel: string,
    varInitial: string | number,
    varMin?: number,
    varMax?: number,
};

export type PageBuilderType = {
        name: string,
        selected: boolean,
        data: PageElementDataType
};

export { drawerWidth, VariableType };