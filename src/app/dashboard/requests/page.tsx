import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import { config } from '@/config';
import type { Metadata } from 'next';

import { CheckCircle as CheckIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { XCircle as XIcon } from '@phosphor-icons/react/dist/ssr/XCircle';
import { Hourglass as PendingIcon } from '@phosphor-icons/react/dist/ssr/Hourglass';
import { RequestsTable } from '@/components/dashboard/requests/requests-table';
import type { Request } from '@/components/dashboard/requests/requests-table';

export const metadata = { title: `Solicitudes | Dashboard | ${config.site.name}` } satisfies Metadata;

// Placeholder data
const requests = [
    {
        id: '1',
        name: 'Pizzas Don Pedro',
        email: 'pizzas@donpedro.com',
        phone: '10101010',
        business_type: 'Restaurante',
        product_type: 'Pizzas',
        product_category: 'Comida rápida',
        branches: 3,
        status: 'processing'
    },
    {
        id: '2',
        name: 'Tacos Perez',
        email: 'pereztacos@gmail.com',
        phone: '20202020',
        business_type: 'Restaurante',
        product_type: 'Tacos',
        product_category: 'Comida rápida',
        branches: 2,
        status: 'processing'
    },
    {
        id: '3',
        name: 'Hotel Real Águila',
        email: 'contacto@realaguila.com',
        phone: '30303030',
        business_type: 'Estadía',
        product_type: 'Hotel',
        product_category: 'Hotel boutique',
        branches: 3,
        status: 'processing'
    },
    {
        id: '4',
        name: 'Cerro Alux',
        email: 'cerroalux@gmail.com',
        phone: '40404040',
        business_type: 'Recreativo',
        product_type: 'Parque',
        product_category: 'Parque ecológico',
        branches: 3,
        status: 'processing'
    },
    {
        id: '5',
        name: 'Bar La Tabla',
        email: 'latabla@gmail.com',
        phone: '50505050',
        business_type: 'Vida nocturna',
        product_type: 'Bar',
        product_category: 'Drinks',
        branches: 1,
        status: 'processing'
    },
    {
        id: '6',
        name: 'Boat Rental Atitlán',
        email: 'atiboats@gmail.com',
        phone: '60606060',
        business_type: 'Recreativo',
        product_type: 'Renta de barcos',
        product_category: 'Barcos',
        branches: 1,
        status: 'processing'
    },
    {
        id: '7',
        name: 'Xtreme Fun',
        email: 'xtremefun@gmail.com',
        phone: '70707070',
        business_type: 'Recreativo',
        product_type: 'Gotcha',
        product_category: 'Deportes extremos',
        branches: 2,
        status: 'processing'
    },
    {
        id: '8',
        name: 'Joyería Don Ángel',
        email: 'joyasangel@gmail.com',
        phone: '80808080',
        business_type: 'Tienda',
        product_type: 'Joyería',
        product_category: 'Tiendas de joyas',
        branches: 5,
        status: 'processing'
    },
    {
        id: '9',
        name: 'Hamburguesas El Compa',
        email: 'elcompaburgers@gmail.com',
        phone: '90909090',
        business_type: 'Restaurante',
        product_type: 'Hamburguesas',
        product_category: 'Comida gourmet',
        branches: 7,
        status: 'processing'
    },
    {
        id: '10',
        name: 'Helados Freezy',
        email: 'freezyheladeria@gmail.com',
        phone: '11111111',
        business_type: 'Restaurante',
        product_type: 'Helados',
        product_category: 'Postres',
        branches: 10,
        status: 'processing'
    },
] satisfies Request[]

export default function Page(): React.JSX.Element {
    const page = 0;
    const rowsPerPage = 5;

    const paginatedRequests = applyPagination(requests, page, rowsPerPage)


    return (
        <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
                <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                    <Typography variant="h4">Solicitudes</Typography>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <Button color="inherit" startIcon={<PendingIcon fontSize="var(--icon-fontSize-md)" />}>
                            Pendientes
                        </Button>
                        <Button color="inherit" startIcon={<CheckIcon fontSize="var(--icon-fontSize-md)" />}>
                            Aceptadas
                        </Button>
                        <Button color="inherit" startIcon={<XIcon fontSize="var(--icon-fontSize-md)" />}>
                            Rechazadas
                        </Button>                    
                    </Stack>
                
                </Stack>
            </Stack>
            <RequestsTable
                count={paginatedRequests.length}
                page={page}
                rows={paginatedRequests}
                rowsPerPage={rowsPerPage}
            />
        </Stack>
    )
}

function applyPagination(rows: Request[], page: number, rowsPerPage: number): Request[] {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }
  