import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { paths } from '@/paths';
import { DynamicLogo } from '@/components/core/logo';

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: { xs: 'flex', lg: 'grid' },
        flexDirection: 'column',
        minHeight: '100%'
      }}
    >
      <Box 
      sx={{ 
        display: 'flex', 
        flex: '1 1 auto', 
        flexDirection: 'column'
      }}
      >

          <Box component={RouterLink} href={paths.home} p={3} >
            <Box alt="logo" component="img" src="assets/guatnext_logo.png"  />
          </Box>
        <Box 
        sx={{ 
          alignItems: 'center', 
          display: 'flex', 
          flex: '1 1 auto', 
          justifyContent: 'center', 
          p: 3
        }}
        >
          <Box sx={{ width: '30%' }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}
