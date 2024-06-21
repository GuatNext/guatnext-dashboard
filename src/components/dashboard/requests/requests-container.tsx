"use client"

import { Box, Button, Divider, Modal, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { width } from "@mui/system";
import { CaretCircleLeft, CheckCircle, PaperPlaneRight, XCircle } from "@phosphor-icons/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { editRequestStatus } from '@/lib/requests';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    width: 600,
    p: 1,
};

export function RequestsContainer(): React.JSX.Element {
    const router = useRouter();
    const searchParams = useParams();
    const id = searchParams.id;
    const [reasonModalOpen, setReasonModalOpen] = useState(false);
    const [reason, setReason] = useState('');

    const onPressReject = () => {
        setReasonModalOpen(true);
    }

    const handleStatusChange = async (status: string) => {
        try {
            await editRequestStatus(id.toString(), status, status === 'REJECTED' ? reason : undefined);
            router.push('/dashboard/requests');
        } catch (error) {
            console.error('Error updating request status:', error);
        }
    }

    return (
        <div>
            <Button 
                variant="contained" 
                style={{ alignSelf: "flex-start", marginBottom: 10}} 
                onClick={() => router.back()} 
                startIcon={<CaretCircleLeft />}
            >
                Regresar
            </Button>
            <Modal
                open={reasonModalOpen}
                onClose={() => setReasonModalOpen(false)}
            >
                <Card sx={style}>
                    <CardContent>
                        <Typography variant="h5">Razón de rechazo</Typography>
                        <Typography>Escribe detalladamente la razón del rechazo de la solicitud para que el proveedor pueda arreglar los datos.</Typography>
                        <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                        <TextField 
                            multiline 
                            fullWidth 
                            label="Razón de rechazo"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                        <Stack 
                            mt={2}
                            direction="row" 
                            spacing={2} 
                            justifyContent="center" 
                            alignItems="center"
                        >
                            <Button variant="contained" startIcon={<XCircle />} onClick={() => setReasonModalOpen(false)}>
                                Cerrar
                            </Button>
                            <Button 
                                variant="contained" 
                                startIcon={<PaperPlaneRight />} 
                                onClick={() => {
                                    setReasonModalOpen(false);
                                    handleStatusChange('REJECTED');
                                }}
                            >
                                Enviar
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Modal>
            <Card>
                <CardContent>
                    <Stack spacing={2} sx={{ justifyContent: 'center' }}>
                        <Typography variant="h5">{`Establecimiento ${id}`}</Typography>
                        <RequestSection text="Nombre" subtext="Nombre de establecimiento" />
                        <RequestSection text="Correo" subtext="correo@establecimiento.com" />
                        <RequestSection text="Teléfono" subtext="+50210101010" />
                        <RequestSection text="Tipo de negocio" subtext="Tipo" />
                        <RequestSection text="Tipo de producto" subtext="Tipo" />
                        <RequestSection text="Categoría del producto" subtext="Categoría" />
                        <RequestSection text="Sucursales" subtext="1" />
                    </Stack>
                    <Stack 
                        mt={2}
                        direction="row" 
                        spacing={2} 
                        justifyContent="center" 
                        alignItems="center"
                    >
                        <Button 
                            variant="contained" 
                            color="success" 
                            startIcon={<CheckCircle />} 
                            onClick={() => handleStatusChange('APPROVED')}
                        >
                            Aceptar
                        </Button>
                        <Button 
                            variant="contained" 
                            color="error" 
                            startIcon={<XCircle />} 
                            onClick={onPressReject}
                        >
                            Rechazar
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </div>
    )
}

function RequestSection({ text, subtext }: { text: string, subtext: string }): React.JSX.Element {
    return (
        <div>
            <div style={{ marginTop: 5, marginBottom: 15 }}>
                <Typography variant="h5">{text}</Typography>
                <Typography>{subtext}</Typography>    
            </div>
            <Divider />
        </div>
    )
}
