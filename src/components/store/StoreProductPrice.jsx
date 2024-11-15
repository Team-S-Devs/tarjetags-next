import {
    FormControlLabel,
    MenuItem,
    Switch,
    TextField,
    Typography,
    Grid,
  } from "@mui/material";
  import React from "react";
  
  const StoreProductPrice = ({
    products = [],
    setProducts,
    index,
    keyProduct = "",
    label = "Precio del plan:",
  }) => {
    const handleEditProductTwoKeys = (val, key2) => {
      const productsCopy = [ ...products ];
      productsCopy[index][keyProduct][key2] = val;
      setProducts(productsCopy);
    };
  
    return (
      <div>
        <div className="d-flex align-items-center mt-4">
          <Typography marginRight={4}>{label}</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={!products[index]?.[keyProduct]?.show}
                onChange={() => {
                  handleEditProductTwoKeys(
                    !products[index]?.[keyProduct]?.show,
                    "show"
                  );
                }}
              />
            }
            label={"Ocultar"}
          />
        </div>
        <Grid container spacing={2} marginTop={.5}>
          <Grid item lg={8} md={8} xs={6}>
            <TextField
              label={"Precio"}
              placeholder="Ej: 100"
              type="number"
              disabled={!products[index]?.[keyProduct]?.show}
              value={products[index]?.[keyProduct]?.number}
              onChange={(e) => handleEditProductTwoKeys(e.target.value, "number")}
              fullWidth
              required
              inputProps={{
                maxLength: 16,
              }}
            />
          </Grid>
          <Grid item lg={4} md={4} xs={6}>
            <TextField
              select
              label="Moneda del precio:"
              disabled={!products[index]?.[keyProduct]?.show}
              value={products[index]?.[keyProduct]?.currency}
              onChange={(e) =>
                handleEditProductTwoKeys(e.target.value, "currency")
              }
              fullWidth
            >
              <MenuItem value="Bs.">Bs.</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </div>
    );
  };
  
  export default StoreProductPrice;
  