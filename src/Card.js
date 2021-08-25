import React from 'react';
import { navigate } from "@reach/router";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import "./card.css";
import moment from "moment";

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

export default function Card(props) {

  function fullDetails() {
    navigate('/fulldetails', { state: { user: props.user } })
  }

  return (

    <StyledTableRow key={props.key}>
      <StyledTableCell component="th" scope="row">
        {props.user.company_name}
      </StyledTableCell>
      <StyledTableCell align="center">{`House Number/Name: ${props.user.house_number}, Street Name: ${props.user.street_name}, Town Name: ${props.user.town_name}, PostCode: ${props.user.postcode}`}</StyledTableCell>
      <StyledTableCell align="center">{moment(props.user.createdAt).format('DD-MM-YYYY')}</StyledTableCell>
      <StyledTableCell align="center">{props.user.status}</StyledTableCell>
      <StyledTableCell align="center"><button className="btn btn-primary view_details" id="viewDetails" onClick={fullDetails}>View Details</button></StyledTableCell>
    </StyledTableRow>

  );
}
