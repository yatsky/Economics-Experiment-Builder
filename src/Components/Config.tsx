const drawerWidth = 140;

// VariableType for PageElement
enum VariableType {
    StringVariable,
    IntegerVariable,
    CurrencyVariable,
    BooleanVariable,
    // This is pure text
    PureText,
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