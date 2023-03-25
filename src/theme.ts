import { createTheme } from '@mui/material';

export default createTheme({
    components: {
        MuiBreadcrumbs: {
            defaultProps: {
                separator: '›',
            },
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
                variant: 'contained',
            },
        },
        MuiSelect: {
            defaultProps: {
                size: 'small',
                variant: 'outlined',
            },
        },
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
        MuiTextField: {
            defaultProps: {
                size: 'small',
                variant: 'outlined',
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
