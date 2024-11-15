import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { MAIN_COLOR } from "../../utils/constants";

const StoreCategorySelector = ({
  categories = [],
  products = [],
  setProducts,
  index = 0,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleRadioChange = (ev) => {
    const selectedCategoryId = ev.target.value;
    const productsCopy = [ ...products ];
    productsCopy[index].category = selectedCategoryId;
    setProducts(productsCopy);
  };

  return (
    <div>
      <Accordion onChange={() => setExpanded(false)}>
        <AccordionSummary
          expandIcon={
            expanded ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />
          }
          aria-controls={`panel-a-content`}
          id={`panel-a-header`}
        >
          <Typography>
            <BiCategory
              color={MAIN_COLOR}
              style={{ marginRight: 8, marginTop: -2 }}
            />
            Seleccionar categoría
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ maxHeight: 540, overflow: "auto" }}>
          <RadioGroup
            value={products[index]?.category || ""}
            onChange={handleRadioChange}
          >
            {categories.map((cat) => (
              <FormControlLabel
                key={cat.id + "category-radio"}
                value={cat.id}
                control={<Radio />}
                label={cat.title}
              />
            ))}
          </RadioGroup>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default StoreCategorySelector;
