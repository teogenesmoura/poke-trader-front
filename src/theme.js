import { createMuiTheme } from '@material-ui/core/styles';

  export const customTheme = createMuiTheme(
    {
    typography: {
      fontFamily: "Open Sans, sans-serif",
      hairline: 100,
      light: 300,
      regular: 400,
      medium: 600,
      bold: 700,
      body:{
        fontSize:12,
        fontStyle: 'regular',
      },
      h1:{
        fontSize:54,
        fontStyle: 'semibold',
      },
      h2:{
        fontSize:36,
        fontStyle: 'semibold',
      },
      h3:{
        fontSize:24,
        fontStyle: 'semibold',
      },
      h4:{
        fontSize:16,
        fontStyle: 'semibold',
      },
      h5:{
        fontSize:14,
        fontStyle: 'semibold',
      },
      h6:{
        fontSize:13,
        fontStyle: 'semibold',
      },
      h7:{
        fontSize:9,
        fontStyle: 'regular',
      },
      body1:{
        fontSize:12,
        fontStyle: 'regular'
      },
      body2:{
        fontSize:9,
        fontStyle: 'semibold',
      }
    },
    palette: {
      primary: {
        main: '#666666',
      },
      cinza1: {
        main: '#F2F2F2',
      },
      cinza2: {
        main: '#C4C4C4',
      },
      grey: {
        main: '#666666',
      },
      amareloCamara: {
        main: '#FAC915',
      },
      verdeCamaraLight: {
        main: '#00AF82',
      },
      white: {
        main: '#FFF',
      },
      black: {
        main: '#000'
      },
      green: {
        main: '#2ecc71'
      },
      red: {
        main: '#e74c3c'
      }
    },
  });
