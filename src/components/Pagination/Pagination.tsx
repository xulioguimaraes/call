import { PaginationControl } from "react-bootstrap-pagination-control";
interface PaginationProps {
  page: number;
  perPage: number;
  onChange: (value: number) => void;
  onChangePerPage: (value: number) => void;
  total: number;
}
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Select } from "@chakra-ui/react";
import { FormEventHandler } from "react";
export const Pagination = ({
  perPage,
  onChange,
  page,
  total,
  onChangePerPage,
}: PaginationProps) => {
  const options = [10, 20, 30, 40, 50, 60, 70, 80, 100];
  const handleSelectPerPage = (page: string) => {
    onChangePerPage(Number(page));
  };
  return (
    <Box
      gap={4}
      className="d-flex"
      justifyContent={"flex-end"}
      position="absolute"
      bottom={0}
      right={0}
      p="2"
    >
      <Select
        w={"20"}
        value={perPage}
        onChange={(e) => handleSelectPerPage(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
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
