import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

const PivotedTable = () => {
    const rows = [
        {
            name: 'Model A',
            dataset: 'Dataset 1',
            handlingValue: 'Mean Imputation',
            encoding: 'One-Hot',
            normalization: 'Min-Max',
            mlModel: 'Random Forest',
            accuracy: '92%',
            precision: '90%',
            recall: '91%',
            f1: '90.5%'
        }
    ];

    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="pivoted grouped table">
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={4} sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
                            General Info
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Dataset Name</TableCell>
                        {rows.map((row) => <TableCell colSpan={2} key={row.name + '-dataset'}>{row.dataset}</TableCell>)}
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Machine Learning Model</TableCell>
                        {rows.map((row) => <TableCell colSpan={2} key={row.name + '-ml'}>{row.mlModel}</TableCell>)}
                    </TableRow>

                    <TableRow>
                        <TableCell colSpan={4} sx={{ backgroundColor: '#f0f0ff', fontWeight: 'bold' }}>
                            Data Preprocessing
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Handling Value</TableCell>
                        {rows.map((row) => <TableCell colSpan={2} key={row.name + '-handle'}>{row.handlingValue}</TableCell>)}
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Encoding Data</TableCell>
                        {rows.map((row) => <TableCell colSpan={2} key={row.name + '-encode'}>{row.encoding}</TableCell>)}
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Normalization</TableCell>
                        {rows.map((row) => <TableCell colSpan={2} key={row.name + '-norm'}>{row.normalization}</TableCell>)}
                    </TableRow>

                    <TableRow>
                        <TableCell colSpan={4} sx={{ backgroundColor: '#fff8e1', fontWeight: 'bold' }}>
                            Evaluation Matrix
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Accuracy</TableCell>
                        {rows.map((row) => <TableCell key={row.name + '-acc'}>{row.accuracy}</TableCell>)}
                        <TableCell>Precision</TableCell>
                        {rows.map((row) => <TableCell key={row.name + '-prec'}>{row.precision}</TableCell>)}
                    </TableRow>
                    <TableRow>
                        <TableCell>Recall</TableCell>
                        {rows.map((row) => <TableCell key={row.name + '-recall'}>{row.recall}</TableCell>)}
                        <TableCell>F1-score</TableCell>
                        {rows.map((row) => <TableCell key={row.name + '-f1'}>{row.f1}</TableCell>)}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PivotedTable;