import type { PagedOrderDto } from '../types';

interface OrderFilterProps {
  nameFilterText: string;
  onSetNameFilterText: (filterText: string) => void;
  isAddOrderMode: boolean;
  isEditOrderMode: boolean;
  selectedOrder: PagedOrderDto | null;
}

// Component for filtering orders by client name
function OrderFilter(props: OrderFilterProps) {
  const { 
    nameFilterText,
    onSetNameFilterText,
    isAddOrderMode,
    isEditOrderMode,
    selectedOrder
  } = props;

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