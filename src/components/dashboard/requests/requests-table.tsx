'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { Button } from '@mui/material';

export interface Request {
    uid: string;
    website: string;
    phoneContact: string[];
    name: string;
    description: string;
    emailContact: string[];
    category: string[];
    status: string;
}

interface RequestsTableProps {
    count: number;
    page: number;
    rows: Request[];
    rowsPerPage: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function RequestsTable({
    count,
    rows,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
}: RequestsTableProps): React.JSX.Element {
    return (
        <Card>
            <Box sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: '800px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre comercial</TableCell>
                            <TableCell>Correo</TableCell>
                            <TableCell>Celular</TableCell>
                            <TableCell>Tipo de negocio</TableCell>
                            <TableCell>Ver detalles</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow hover key={row.uid}>
                                <TableCell>
                                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                                        <Typography variant="subtitle2">{row.name}</Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell>{row.emailContact}</TableCell>
                                <TableCell>{row.phoneContact}</TableCell>
                                <TableCell>{row.category ? row.category[0] : 'No configurada'}</TableCell>
                                <TableCell>
                                    <Link href={`/dashboard/requests/${row.uid}`} passHref>
                                        <Button variant="contained">Ver detalles</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <Divider />
            <TablePagination
                component="div"
                count={count}
                page={page}
                onPageChange={onPageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={onRowsPerPageChange}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
}
