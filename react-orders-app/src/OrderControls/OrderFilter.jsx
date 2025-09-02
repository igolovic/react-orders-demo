function OrderFilter({nameFilterText, onSetNameFilterText}){
  return (
    <>
    <tr>
        <td></td>
        <td></td>
        <td>
            <input
                id="nameFilter"
                type="text"
                value={nameFilterText}
                onChange={(e) => onSetNameFilterText(e.target.value)}
            />
        </td>
        <td></td>
    </tr>
    </>
  );
}

export default OrderFilter