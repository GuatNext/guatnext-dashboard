import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { RequestsContainer } from '@/components/dashboard/requests/requests-container';

export const metadata = { title: `Solicitud | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {

    return (
        <Stack spacing={3}>
                <div>
                    <Typography variant="h4">Detalle de solicitud</Typography>
                </div>
                <RequestsContainer />
        </Stack>
    )

        
}