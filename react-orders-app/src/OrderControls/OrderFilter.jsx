function OrderFilter({nameFilterText, onSetNameFilterText, isAddOrderMode, isEditOrderMode, selectedOrder}){

  const isRowBeingEdited = (isAddOrderMode || isEditOrderMode) && selectedOrder != null;

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
                disabled={isRowBeingEdited}
            />
        </td>
        <td></td>
    </tr>
    </>
  );
}

export default OrderFilter