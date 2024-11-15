export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/Marca.svg" />
        <meta
          property="og:image"
          content="https://i.ibb.co/gV14QPX/Marca.png"
        />
        <meta
          name="description"
          content="Crea tarjetas de presentación que te abran puertas y te conecten con oportunidades."
        />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;700&family=Poppins:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <title>Tarjetag | Inicio</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/src/main.jsx"></script>
      </body>
    </html>
  );
}
