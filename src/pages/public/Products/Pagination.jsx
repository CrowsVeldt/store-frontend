import { Box, Button, ButtonGroup } from "@chakra-ui/react";

export default function Pagination({
  currentPage,
  productsPerPage,
  totalProducts,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleClick = (page) => {
    onPageChange(page);
  };

  const goToPreviousPage = () => {
    onPageChange((page) => (page > 1 ? page - 1 : page));
  };

  const goToNextPage = () => {
    onPageChange((page) => (page < totalPages ? page + 1 : page));
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handleClick(i)}
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
        {currentPage > 1 && <Button onClick={goToPreviousPage}>{"<<"}</Button>}
        {renderPaginationButtons()}
        {currentPage < totalPages && (
          <Button onClick={goToNextPage}>{">>"}</Button>
        )}
      </ButtonGroup>
    </Box>
  );
}
