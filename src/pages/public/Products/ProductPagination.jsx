import { Box, Button, ButtonGroup } from "@chakra-ui/react";

export default function ProductPagination({
  currentPage,
  productsPerPage,
  totalProducts,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const changePage = (page) => {
    onPageChange(page);
  };

  const goToPreviousPage = (page) => {
    onPageChange(page > 1 ? page - 1 : page);
  };

  const goToNextPage = (page) => {
    onPageChange(page < totalPages ? page + 1 : page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => changePage(i)}
          colorScheme={currentPage === i ? "cyan" : "gray"}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <Box>
      <ButtonGroup spacing={2}>
        {currentPage > 1 && (
          <Button onClick={() => goToPreviousPage(currentPage)}>{"<<"}</Button>
        )}
        {renderPaginationButtons()}
        {currentPage < totalPages && (
          <Button onClick={() => goToNextPage(currentPage)}>{">>"}</Button>
        )}
      </ButtonGroup>
    </Box>
  );
}
