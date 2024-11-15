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

const CategorySelector = ({ userInfo, setUserInfo, index = 0 }) => {
  const [expanded, setExpanded] = useState(false);

  const handleRadioChange = (ev) => {
    const selectedCategoryId = ev.target.value;
    const userInfoCopy = { ...userInfo };
    userInfoCopy.products[index].category = selectedCategoryId;
    setUserInfo(userInfoCopy);
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
            value={userInfo.products[index]?.category || ""}
            onChange={handleRadioChange}
          >
            {userInfo.productCategories.map((cat) => (
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

export default CategorySelector;
