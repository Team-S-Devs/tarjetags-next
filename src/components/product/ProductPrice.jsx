import {
  FormControlLabel,
  MenuItem,
  Switch,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import React from "react";

const ProductPrice = ({
  elementsInfo,
  setElementsInfo,
  index,
  keyProduct = "",
  label = "Precio del plan:",
}) => {
  const handleEditProductTwoKeys = (val, key2) => {
    const elementsInfoCopy = { ...elementsInfo };
    elementsInfoCopy.products[index][keyProduct][key2] = val;
    setElementsInfo(elementsInfoCopy);
  };

  return (
    <div>
      <div className="d-flex align-items-center mt-4">
        <Typography marginRight={4}>{label}</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={!elementsInfo.products[index]?.[keyProduct]?.show}
              onChange={() => {
                handleEditProductTwoKeys(
                  !elementsInfo.products[index]?.[keyProduct]?.show,
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
            disabled={!elementsInfo.products[index]?.[keyProduct]?.show}
            value={elementsInfo.products[index]?.[keyProduct]?.number}
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
            disabled={!elementsInfo.products[index]?.[keyProduct]?.show}
            value={elementsInfo.products[index]?.[keyProduct]?.currency}
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

export default ProductPrice;
