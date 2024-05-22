'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useSelection } from '@/hooks/use-selection';
import { Status } from '@/types/status';

function noop(): void {
    // do nothing
  }

export interface Request {
    id: string;
    name: string;
    email: string;
    phone: string;
    business_type: string;
    product_type: string;
    product_category: string;
    branches: number;
    status: Status;
}

interface RequestsTableProps {
    count?: number;
    page?: number;
    rows?: Request[];
    rowsPerPage?: number;
}

export function RequestsTable({
    count = 0,
    rows = [],
    page = 0,
    rowsPerPage = 0,
}: RequestsTableProps): React.JSX.Element {
    const rowIds = React.useMemo(() => {
        return rows.map((request) => request.id);
      }, [rows]);

      const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

      const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
      const selectedAll = rows.length > 0 && selected?.size === rows.length;
    


    return(
        <Card>
            <Box sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: '800px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedAll}
                                    indeterminate={selectedSome}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                        selectAll();
                                        } else {
                                        deselectAll();
                                        }
                                    }}
                                />
                            </TableCell>
                            <TableCell>Nombre comercial</TableCell>
                            <TableCell>Correo</TableCell>
                            <TableCell>Celular</TableCell>
                            <TableCell>Tipo de negocio</TableCell>
                            <TableCell>No. de sucursales</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            const isSelected = selected?.has(row.id);

                            return(
                                <TableRow hover key={row.id} selected={isSelected}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                        checked={isSelected}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                            selectOne(row.id);
                                            } else {
                                            deselectOne(row.id);
                                            }
                                        }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                                            <Typography variant="subtitle2">{row.name}</Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    <TableCell>
                                        {row.business_type}
                                    </TableCell>
                                    <TableCell>{row.branches.toString()}</TableCell>
                                    <TableCell>Ver detalles</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Box>
            <Divider />
            <TablePagination
                component="div"
                count={count}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    )
}