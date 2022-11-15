import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import rejectOffer from "../../services/deleteOffer"
import acceptOffer from "../../services/acceptOffer"

// Snackbar imports
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function OfferDecision({
  slug,
}) {
  const { headers } = useAuth();
  const navigate = useNavigate();

  const [reject, setReject] = React.useState(false);
  const [accept, setAccept] = React.useState(false);

  const handleReject = () => {
    setReject(true);
    rejectOffer({ headers, slug })
  .then(() => navigate("/"))
  .catch(console.error);
  };

  const handleAccept = () => {
        setAccept(true);
        acceptOffer({ headers, slug })
      .then(() => navigate("/"))
      .catch(console.error);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setReject(false);
    setAccept(false)
  };

  return (
    <>
      <button
        className="btn btn-sm"
        style={{ color: "#d00" }}
        onClick={handleReject}
      >
        <i className="ion-trash-a"></i> Reject Offer
      </button>{" "}
      <button
        className="btn btn-sm"
        style={{ color: "#777" }}
        onClick={handleAccept}
      >
          <i className="ion-edit"></i> Accept Offer
      </button>{" "}

      <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={accept} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Offer accepted! Congratulations!
        </Alert>
      </Snackbar>

      <Snackbar open={reject} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          Offer rejected. Sorry to see you go.
        </Alert>
      </Snackbar>
    </Stack>
    </>
  );
}

export default OfferDecision;