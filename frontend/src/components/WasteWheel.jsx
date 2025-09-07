// WasteWheel.jsx
import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Sector } from "recharts";

const WasteWheel = ({ items, onSelect, sizeRem = 26 }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const COLORS = ["#2ecc71", "#27ae60"];

  const chartData = items.map((item, index) => ({
    name: item.category,
    value: 1,
    color: COLORS[index % COLORS.length],
  }));

  // Hover shape: pop out effect
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props;

    return (
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 15}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    );
  };

  return (
    <div className="flex flex-col items-center">
      <PieChart width={sizeRem * 16} height={sizeRem * 16}>
        <Pie
          data={chartData}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={190}
          innerRadius={70}  // ⬅ bigger center
          paddingAngle={1}
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          onClick={(_, index) => onSelect(index)}
          onMouseEnter={(_, index) => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
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

        {/* Slice labels */}
        {chartData.map((entry, index) => {
          const angle = 360 / chartData.length;
          const midAngle = index * angle + angle / 2;
          const RADIAN = Math.PI / 180;
          const cx = (sizeRem * 16) / 2;
          const cy = (sizeRem * 16) / 2;
          const radius = (150 + 85) / 2;
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          const y = cy + radius * Math.sin(-midAngle * RADIAN);

          return (
            <text
              key={`slice-text-${index}`}
              x={x}
              y={y}
              fill="white"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="20"   // ⬅ increase this (16, 18, 20…)
              fontWeight="600"
              pointerEvents="none"
            >
              {entry.name}
            </text>
          );
        })}

        {/* Center title */}
        <text
          x={(sizeRem * 16) / 2}
          y={(sizeRem * 16) / 2 - 10}
          textAnchor="middle"
          dominantBaseline="central"
          className="text-xl font-bold fill-forest"
        >
          Waste
        </text>
        <text
          x={(sizeRem * 16) / 2}
          y={(sizeRem * 16) / 2 + 15}
          textAnchor="middle"
          dominantBaseline="central"
          className="text-xl font-bold fill-forest"
        >
          Wheel
        </text>

        <Tooltip />
      </PieChart>
    </div>
  );
};

export default WasteWheel;

