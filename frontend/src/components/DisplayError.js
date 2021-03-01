import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import PropTypes from "prop-types";

const DisplayError = ({ error }) => {
  <Alert status="error">
    <AlertIcon />
    <AlertTitle mr={2}>
      {error?.message ? error.message : "Unknown Error Occured"}
    </AlertTitle>
  </Alert>;
};

DisplayError.propType = {
  error: PropTypes.object,
};

export default DisplayError;
