export function getEmptyTable(rowsCount: number, columnsCount: number) {
    if (rowsCount < 1 || columnsCount < 1) {
        return <></>
    }

    const emptyTableRows = [
        <tr key={1}>
            <td>
                1
            </td>
            <td
                rowSpan={rowsCount}
                colSpan={columnsCount - 1}
            >Данные отсутствуют</td>
        </tr>
    ]

    for (let i = 2; i <= rowsCount; i++) {
        emptyTableRows.push(
            <tr key={i}>
                <td>{i}</td>
            </tr>
        );
    }

    return emptyTableRows;
}