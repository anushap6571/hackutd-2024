import React from 'react';
import { Svg, Path, G } from 'react-native-svg';

const DonutHoleChart = ({ data, radius }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let startAngle = 0;

  return (
    <Svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
      <G transform={`translate(${radius}, ${radius})`}>
        {data.map((item, index) => {
          const angle = (item.value / total) * 360;
          const endAngle = startAngle + angle;
          const x1 = radius * Math.cos((startAngle * Math.PI) / 180);
          const y1 = radius * Math.sin((startAngle * Math.PI) / 180);
          const x2 = radius * Math.cos((endAngle * Math.PI) / 180);
          const y2 = radius * Math.sin((endAngle * Math.PI) / 180);
          const largeArcFlag = angle > 180 ? 1 : 0;

          const pathData = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L 0 0 Z`;

          startAngle = endAngle;

          return (
            <Path key={index} d={pathData} fill={item.color} />
          );
        })}
      </G>
    </Svg>
  );
};

export default DonutHoleChart;