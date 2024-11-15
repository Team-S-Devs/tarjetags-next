import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "../src/index.css";
import { theme } from "../src/utils/theme";
import Head from "next/head";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/Marca.svg" />
        <meta
          property="og:image"
          content="https://i.ibb.co/gV14QPX/Marca.png"
        />
        <meta
          name="description"
          content="Crea tarjetas de presentación que te abran puertas y te conecten con oportunidades."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;700&family=Poppins:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <title>Tarjetag | Inicio</title>
      </Head>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Component {...pageProps} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default MyApp;
