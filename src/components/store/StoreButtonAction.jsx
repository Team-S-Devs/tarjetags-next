import { FormControlLabel, Switch, TextField, Typography } from "@mui/material";
import React from "react";

const StoreButtonAction = ({ products = [], setProducts, index }) => {
  const handleEditProductTwoKeys = (val, key2) => {
    const productsCopy = [...products];
    productsCopy[index]["buttonAction"][key2] = val;
    setProducts(productsCopy);
  };

  return (
    <div>
      <div className="mt-1 mb-2">
        <Typography marginRight={4}>{"Destino del botón principal"}</Typography>
        <TextField
          label={"Texto del botón"}
          helperText=""
          value={products[index].buttonAction.buttonText}
          onChange={(e) =>
            handleEditProductTwoKeys(e.target.value, "buttonText")
          }
          fullWidth
          required
          inputProps={{
            maxLength: 120,
          }}
          style={{
            margin: "28px 0",
          }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={products[index]?.buttonAction.forWpp}
              onChange={() => {
                handleEditProductTwoKeys(
                  !products[index]?.buttonAction.forWpp,
                  "forWpp"
                );
              }}
            />
          }
          label={"Redireccionar a Whatsapp"}
          style={{ marginTop: 8 }}
        />
      </div>
      {products[index]?.buttonAction.forWpp ? (
        <>
          <TextField
            label={"Número de Whatsapp"}
            type="number"
            disabled={!products[index]?.buttonAction.forWpp}
            value={products[index].buttonAction.wppNumber}
            onChange={(e) =>
              handleEditProductTwoKeys(e.target.value, "wppNumber")
            }
            fullWidth
            required
            inputProps={{
              maxLength: 10,
            }}
            style={{
              marginBottom: 4,
              marginTop: 4,
            }}
          />
          <TextField
            label={"Mensaje de saludo"}
            helperText="Se incluirá información acerca de su producto o servicio en el mensaje"
            disabled={!products[index]?.buttonAction.forWpp}
            value={products[index].buttonAction.wppMessage}
            onChange={(e) =>
              handleEditProductTwoKeys(e.target.value, "wppMessage")
            }
            fullWidth
            required
            inputProps={{
              maxLength: 120,
            }}
            style={{
              marginBottom: 24,
              marginTop: 14,
            }}
          />
        </>
      ) : (
        <>
          <TextField
            label={"URL de redireccionamiento"}
            helperText="Introduce la URL donde se redirigirá al usuario al presionar el botón del producto o servicio"
            value={products[index].buttonAction.customUrl}
            disabled={products[index]?.buttonAction.forWpp}
            onChange={(e) =>
              handleEditProductTwoKeys(e.target.value, "customUrl")
            }
            fullWidth
            required
            inputProps={{
              maxLength: 120,
            }}
            style={{
              marginBottom: 24,
              marginTop: 14,
            }}
          />
        </>
      )}
    </div>
  );
};

export default StoreButtonAction;
