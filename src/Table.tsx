const Table = ({ matrix }) => {
    console.log("matrix = ", JSON.stringify(matrix));

    return (
        <table>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
            </tr>
            <tr>
                <td>Anom</td>
                <td>19</td>
                <td>Male</td>
            </tr>
            <tr>
                <td>Megha</td>
                <td>19</td>
                <td>Female</td>
            </tr>
            <tr>
                <td>Subham</td>
                <td>25</td>
                <td>Male</td>
            </tr>
        </table>
    )
}

export default Table;