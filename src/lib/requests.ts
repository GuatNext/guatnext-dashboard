import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { Request } from '@/components/dashboard/requests/requests-table';

export const fetchRequests = async (status: string): Promise<Request[]> => {
  const auth = getAuth();
  
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const response = await fetch(`https://users-qtuc4oxynq-uc.a.run.app/providers/get/providers/by/status/${status}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();

          if (data.error) {
            reject(new Error('Error fetching data from the server'));
          }

          resolve(data.result);
        } catch (error) {
          reject(new Error('Error fetching token'));
        }
      } else {
        reject(new Error('User is not authenticated'));
      }
    });
  });
};

export const editRequestStatus = async (id: string, status: string, reason?: string): Promise<void> => {
    const auth = getAuth();
  
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const token = await user.getIdToken();
            console.log('Token:', token); // Debugging token
  
            const response = await fetch(`https://users-qtuc4oxynq-uc.a.run.app/providers/update/${id}`, {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(status), // Correctly stringify status and reason
            });
  
            const data = await response.json();
            console.log('Response:', data); // Debugging response
  
            if (data.error) {
              reject(new Error('Error updating request status'));
            }
  
            resolve();
          } catch (error) {
            console.error('Error in try block:', error); // More detailed error logging
            reject(new Error('Error in try block'));
          }
        } else {
          reject(new Error('User is not authenticated'));
        }
      });
    });
  };