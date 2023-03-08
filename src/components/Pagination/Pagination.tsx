import { PaginationControl } from "react-bootstrap-pagination-control";
interface PaginationProps {
  page: number;
  perPage: number;
  onChange: (value: number) => void;

  total: number;
}
import "bootstrap/dist/css/bootstrap.min.css";
import { Box } from "@chakra-ui/react";
export const Pagination = ({
  perPage,
  onChange,
  page,
  total,
}: PaginationProps) => {
  return (
    <Box className="d-flex" justifyContent={"flex-end"}>
      <PaginationControl
      page={page}
      between={3}
      total={total}
      limit={perPage}
      changePage={(page) => {
        onChange(page);
      }}
      ellipsis={1}
    />
    </Box>
  );
};
