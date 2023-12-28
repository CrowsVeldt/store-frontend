import { Box, CircularProgress } from "@chakra-ui/react";

export default function LoadingCircle() {
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... &nbsp;
          <CircularProgress isIndeterminate />
        </Box>
    )
}