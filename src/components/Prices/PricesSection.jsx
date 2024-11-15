import { Grid } from "@mui/material";
import "../../assets/styles/Prices/PricesSection.css";
import CardPrice from "./CardPrice";

const PricesSection = ({ showFirstTree = true, user }) => {
  return (
    <Grid
      container
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      spacing={4}
    >
      {showFirstTree ? (
        <>
          <Grid
            item
            sm={12}
            xl={4}
            lg={4}
            md={6}
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <CardPrice idPlan={1} user={user} />
          </Grid>
          <Grid
            item
            sm={12}
            xl={4}
            lg={4}
            md={6}
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <CardPrice idPlan={2} user={user} />
          </Grid>
          <Grid
            item
            sm={12}
            xl={4}
            lg={4}
            md={6}
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <CardPrice idPlan={3} user={user} />
          </Grid>
        </>
      ) : (
        <>
          {" "}
          <Grid
            item
            sm={12}
            xl={4}
            lg={4}
            md={6}
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <CardPrice idPlan={4} user={user} />
          </Grid>
          <Grid
            item
            sm={12}
            xl={4}
            lg={4}
            md={6}
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <CardPrice idPlan={5} user={user} />
          </Grid>
          <Grid
            item
            sm={12}
            xl={4}
            lg={4}
            md={6}
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <CardPrice idPlan={6} user={user} />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default PricesSection;
