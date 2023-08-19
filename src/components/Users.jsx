import React, { useEffect, useState } from "react";
import { Button, Table } from "@mantine/core";
import { FiEye } from "react-icons/fi";
import { TbEdit } from "react-icons/tb";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Fuse from "fuse.js";
import { useNavigate } from "react-router-dom";

const options = {
  includeScore: true,
  keys: ["firstName", "lastName", "username", "pfnumber", "department"],
};
const Users = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [searchItems, setSearchItems] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:4000/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUsers(data);
      setSearchItems(data);
    };

    fetchUsers();
  }, []);

  const fuse = new Fuse(users, options);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function handleViewButton(id) {
    // router.push(`/users/${id}`);
    console.log(id);
  }

  function handleEdit(id) {
    // router.push(`/users/edit/${id}`);
    console.log(id);
  }

  function handleSearch(e) {
    const foundItems = fuse
      .search(e.target.value)
      .map((element) => element.item);
    if (foundItems.length === 0) {
      setSearchItems(users);
    } else {
      setSearchItems(foundItems);
    }
  }

  return (
    <>
      <h1 className="main-heading text-4xl font-bold">User Management</h1>
      <Paper sx={{ width: "80%", overflow: "auto" }} className="mt-7">
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell className="font-bold text-md uppercase">
                  Firstname
                </StyledTableCell>
                <StyledTableCell className="font-bold text-md uppercase">
                  Lastname
                </StyledTableCell>
                <StyledTableCell className="font-bold text-md uppercase">
                  Email
                </StyledTableCell>
                <StyledTableCell className="font-bold text-md uppercase">
                  Department
                </StyledTableCell>
                <StyledTableCell className="font-bold text-md uppercase">
                  Designation
                </StyledTableCell>
                <StyledTableCell className="font-bold text-md uppercase">
                  Role
                </StyledTableCell>
                <StyledTableCell className="font-bold text-md uppercase">
                  Actions
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {users &&
                users.map((user) => (
                  <StyledTableRow
                    key={user.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    className="font-bold text-md"
                  >
                    <StyledTableCell
                      component="th"
                      scope="row"
                      className="font-bold text-md"
                    >
                      {user.firstname}
                    </StyledTableCell>
                    <StyledTableCell className="font-bold text-md">
                      {user.lastname}
                    </StyledTableCell>
                    <StyledTableCell className="font-bold text-md">
                      {user.email}
                    </StyledTableCell>

                    <StyledTableCell className="font-bold text-md text-center">
                      {user.department}
                    </StyledTableCell>

                    <StyledTableCell className="font-bold text-md text-center">
                      {user.designation}
                    </StyledTableCell>

                    <StyledTableCell className="font-bold text-md text-center">
                      {user.role}
                    </StyledTableCell>
                    <StyledTableCell className="font-bold text-md">
                      <Button.Group className="gap-1">
                        <Tooltip
                          title="View user Details"
                          placement="top"
                          arrow
                          className="cursor-pointer"
                          onClick={() => handleViewButton(user.id)}
                        >
                          <FiEye
                            size="1.5rem"
                            color="white"
                            className="bg-amber-600 rounded"
                          />
                        </Tooltip>
                        <Tooltip
                          title="Edit user Details"
                          placement="top"
                          arrow
                          className="cursor-pointer"
                          onClick={() => handleEdit(user.id)}
                        >
                          <TbEdit
                            size="1.5rem"
                            color="white"
                            className="bg-blue-600 rounded"
                          />
                        </Tooltip>
                      </Button.Group>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default Users;
