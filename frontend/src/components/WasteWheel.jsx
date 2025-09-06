// WasteWheel.jsx
import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Sector } from "recharts";

const WasteWheel = ({ items, onSelect, sizeRem = 26 }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Alternate green shades
  const COLORS = ["#2ecc71", "#27ae60"];

  // Prepare equal-slice data
  const chartData = items.map((item, index) => ({
    name: item.category,
    value: 1,
    color: COLORS[index % COLORS.length],
  }));

  // Custom hover shape (pops out slice)
  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
    } = props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 15} // pop out on hover
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <text
          x={cx}
          y={cy}
          dy={8}
          textAnchor="middle"
          fill="#333"
          className="font-semibold"
        >
          {payload.name}
        </text>
      </g>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <PieChart width={sizeRem * 16} height={sizeRem * 16}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          innerRadius={40}
          paddingAngle={1}
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          onClick={(_, index) => onSelect(index)}
          onMouseEnter={(_, index) => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
          label={({ name }) => name}
          labelLine={false}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color}
              stroke="#fff"
              strokeWidth={1}
              cursor="pointer"
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default WasteWheel;
