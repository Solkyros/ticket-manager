import { Box, Typography } from "@mui/material";
import { useEffect } from "react";

export const NotFound = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <Box margin={5}>
      <Typography variant="h4">Page Not Found</Typography>
    </Box>
  );
};
