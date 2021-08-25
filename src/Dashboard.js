import React from "react";
import "./dashboard.css";
import Card from "./Card";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "./card.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles({
  table: {
    minWidth: 900,


  },
});

function Dashboard() {
  let obj = window.localStorage.getItem('user_login');
  if (typeof (obj) == "string") {
      obj = JSON.parse(obj);
  } else {
      obj = {};
  }
  let arr = JSON.parse(obj.data);
  console.log(arr)
  const classes = useStyles();
  return (
    <div>
      <div className="topHead">
        <h1 className="TopHeading">Find all Your Queries Here!</h1>
      </div>

      {/* Reports */}
      <h1 className="headingDash">Dashboard Reports</h1>

      <TableContainer component={Paper} id="table">
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Company Name</StyledTableCell>
              <StyledTableCell align="center" > Registered Address</StyledTableCell>
              <StyledTableCell align="center">Submitted on</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arr.map((user,index) => (
              <Card user={user} key={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default Dashboard;