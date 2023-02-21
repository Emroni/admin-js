import { createTheme } from '@mui/material';

export default createTheme({
    components: {
        MuiTable: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiTableRow: {
            defaultProps: {
                hover: true,
            },
        },
    },
    palette: {
        mode: 'dark',
    },
    typography: {
        fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    },
});
