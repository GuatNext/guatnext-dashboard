import type { Request } from '@/components/dashboard/requests/requests-table';

export const fetchRequests = async (status: string): Promise<Request[]> => {
    const response = await fetch(`https://users-qtuc4oxynq-uc.a.run.app/providers/get/providers/by/status/${status}`);
    const data = await response.json();

    if (data.error) {
        throw new Error('Error fetching data from the server');
    }

    return data.result;
}