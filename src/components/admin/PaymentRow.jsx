import dayjs from 'dayjs';
import React from 'react'

const PaymentRow = ({
    data={},
    nro=0

}) => {

    const getModifiedDate = (date) => {
        if (date) {
          const fireBaseTime = new Date(
            date.seconds * 1000 + date.nanoseconds / 1000000
          );
          const formattedDate = dayjs(fireBaseTime).format("DD/MM/YYYY");
          return formattedDate;
        }
        return "";
    };

  return (
    <tr key={nro}>
        <td>{nro + 1}</td>
        <td>{getModifiedDate(data.fecha)}</td> 
        <td>{data.license}</td> 
        <td>{data.discountCode}</td> 
    </tr>
  )
}

export default PaymentRow