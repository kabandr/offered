import React from "react";
import Markdown from "markdown-to-jsx";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import OfferMeta from "../../components/OfferMeta";
import OffersButtons from "../../components/OffersButtons";
import OfferTags from "../../components/OfferTags";
import BannerContainer from "../../components/BannerContainer";
import { useAuth } from "../../context/AuthContext";
import getOffer from "../../services/getOffer";

// Accordion imports
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function Offer() {
  const { state } = useLocation();
  const [offer, setOffer] = useState(state || {});

  // Accordion state
  const [expanded, setExpanded] = React.useState("");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // Offer state
  const { candidate, role, compensation, equity, benefits, terms, tagList } =
    offer || {};

  const { headers, isAuth } = useAuth();
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (state) return;

    getOffer({ slug, headers })
      .then(setOffer)
      .catch((error) => {
        console.error(error);
        navigate("/not-found", { replace: true });
      });
  }, [isAuth, slug, headers, state, navigate]);

  return (
    <div className="article-page">
      <BannerContainer>
        <h1>{candidate}</h1>
        <h2>{role}</h2>
        <OfferMeta candidate={candidate} role={role}>
          <OffersButtons offer={offer} setOffer={setOffer} />
        </OfferMeta>
      </BannerContainer>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Compensation</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{compensation}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                aria-controls="panel2d-content"
                id="panel2d-header"
              >
                <Typography>Equity</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{equity}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                aria-controls="panel3d-content"
                id="panel3d-header"
              >
                <Typography>Benefits</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {benefits && (
                    <Markdown options={{ forceBlock: true }}>
                      {benefits}
                    </Markdown>
                  )}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                aria-controls="panel4d-content"
                id="panel4d-header"
              >
                <Typography>Terms</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {terms && (
                    <Markdown options={{ forceBlock: true }}>{terms}</Markdown>
                  )}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <OfferTags tagList={tagList} />
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <OfferMeta candidate={candidate} role={role}>
            <OffersButtons offer={offer} setOffer={setOffer} />
          </OfferMeta>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default Offer;
