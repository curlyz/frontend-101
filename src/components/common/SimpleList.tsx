import React from "react";
import { List as AntList, Typography } from "antd";
import type { ListProps } from "antd";

const { Text } = Typography;

interface SimpleListProps<T>
  extends Omit<ListProps<T>, "dataSource" | "renderItem"> {
  items: T[];
  renderItemContent: (item: T, index: number) => React.ReactNode;
  emptyMessage?: string;
}

/**
 * A simple wrapper around Ant Design List for rendering basic lists.
 * Demonstrates list rendering and conditional rendering for empty state.
 *
 * @template T The type of items in the list.
 * @param {SimpleListProps<T>} props Component props.
 * @returns {JSX.Element} The SimpleList component.
 */
function SimpleList<T>({
  items,
  renderItemContent,
  emptyMessage = "No items to display",
  ...rest
}: SimpleListProps<T>) {
  if (!items || items.length === 0) {
    return <Text type="secondary">{emptyMessage}</Text>;
  }

  return (
    <AntList
      {...rest}
      size={rest.size || "small"}
      dataSource={items}
      renderItem={(item, index) => (
        <AntList.Item>{renderItemContent(item, index)}</AntList.Item>
      )}
    />
  );
}

export default SimpleList;
