import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import ElementsCardTab from "./ElementsCardTab";
import ButtonsCardTab from "./ButtonsCardTab";
import ProductsServicesTab from "./ProductsServicesTab";

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const EditCardTabs = ({
  elementsInfo = { title: "", description: "", socialLinks: [] },
  setElementsInfo,
  cardId = "",
  licenseType = "",
  setOpenUpdate
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ flex: 3 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", maxWidth: "92vw" }}>
        <Tabs
          scrollButtons="auto"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="scrollable tabs example"
        >
          <Tab label="Elementos" {...a11yProps(0)} />
          <Tab label="Botones" {...a11yProps(1)} />
          <Tab label="Tienda" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ElementsCardTab
          elementsInfo={elementsInfo}
          setElementsInfo={setElementsInfo}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ButtonsCardTab
          elementsInfo={elementsInfo}
          setElementsInfo={setElementsInfo}
          cardId={cardId}
          licenseType={licenseType}
          setOpenUpdate={setOpenUpdate}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ProductsServicesTab
          elementsInfo={elementsInfo}
          setElementsInfo={setElementsInfo}
          cardId={cardId}
          licenseType={licenseType}
          setOpenUpdate={setOpenUpdate}
        />
      </CustomTabPanel>
    </div>
  );
};

export default EditCardTabs;
