'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CheckCircle as CheckIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { XCircle as XIcon } from '@phosphor-icons/react/dist/ssr/XCircle';
import { Hourglass as PendingIcon } from '@phosphor-icons/react/dist/ssr/Hourglass';
import { RequestsTable } from '@/components/dashboard/requests/requests-table';
import type { Request } from '@/components/dashboard/requests/requests-table';
import { fetchRequests } from '@/lib/requests';
import { CircularProgress } from '@mui/material';

export default function Page(): React.JSX.Element {
    const [requests, setRequests] = React.useState<Request[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [totalRequests, setTotalRequests] = React.useState(0);
    const [status, setStatus] = React.useState('PENDING');
    const [loading, setLoading] = React.useState(false);

    const fetchPaginatedRequests = async (status: string, page: number, rowsPerPage: number): Promise<{ data: Request[], total: number }> => {
        const data = await fetchRequests(status);
        return { data: data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), total: data.length };
    }

    const handleFetchRequests = async (status: string) => {
        setLoading(true);
        setStatus(status);
        try {
            const { data, total } = await fetchPaginatedRequests(status, page, rowsPerPage);
            setRequests(data);
            setTotalRequests(total);
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = async (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
        try {
            const { data } = await fetchPaginatedRequests(status, newPage, rowsPerPage);
            setRequests(data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const handleRowsPerPageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0); // Reset to the first page
        try {
            const { data, total } = await fetchPaginatedRequests(status, 0, newRowsPerPage);
            setRequests(data);
            setTotalRequests(total);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    React.useEffect(() => {
        handleFetchRequests(status);
    }, [status]);

    return (
        <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
                <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                    <Typography variant="h4">Solicitudes</Typography>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <Button 
                            color="inherit" 
                            startIcon={<PendingIcon fontSize="var(--icon-fontSize-md)" />}
                            onClick={() => handleFetchRequests('PENDING')}
                        >
                            Pendientes
                        </Button>
                        <Button 
                            color="inherit" 
                            startIcon={<CheckIcon fontSize="var(--icon-fontSize-md)" />}
                            onClick={() => handleFetchRequests('APPROVED')}
                        >
                            Aceptadas
                        </Button>
                        <Button 
                            color="inherit" 
                            startIcon={<XIcon fontSize="var(--icon-fontSize-md)" />}
                            onClick={() => handleFetchRequests('REJECTED')}
                        >
                            Rechazadas
                        </Button>                    
                    </Stack>
                
                </Stack>
            </Stack>
            {loading ? (
                <Stack alignItems="center" justifyContent="center" spacing={2}>
                    <CircularProgress color="primary" />
                    <Typography>Loading...</Typography>
                </Stack>
            ) : (
                <RequestsTable
                    count={totalRequests}
                    page={page}
                    rows={requests}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            )}
        </Stack>
    );
}